import AsyncStorage from '@react-native-async-storage/async-storage';
import { rest } from 'msw';
import { z } from 'zod';

import { HOST_URL } from 'src/data/host';
import { STORAGE_KEY_TASK_MAP_OBJECT } from './setUpDB';
import {
  delayedResponse,
  createErrorChangeOnResponse,
  makeGetEndpoint,
} from './utils';
import { createZodErrorMessage, strToNum } from 'src/utils/helpers';
import { Task, taskSchema } from 'src/utils/schema';

const { EXPO_PUBLIC_MOCKING_ERROR_CHANCE } = process.env;
const errorChance =
  EXPO_PUBLIC_MOCKING_ERROR_CHANCE === undefined
    ? 0
    : strToNum(EXPO_PUBLIC_MOCKING_ERROR_CHANCE);

const getResponseWithErrorByChance = createErrorChangeOnResponse(errorChance);

const getDetailHandler = makeGetEndpoint(
  z.object({ id: z.string({ required_error: 'id is required' }) }),
  async (req, res, ctx) => {
    try {
      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );
      const getTaskByKeyFromTaskObjStr = setTaskKey(req.params.id);
      return delayedResponse(
        await getResponseWithErrorByChance(
          taskObjStr as string,
          getTaskByKeyFromTaskObjStr,
          ctx,
        ),
      );
    } catch (error) {
      console.error(error);
      return delayedResponse(ctx.status(500, (error as Error).message));
    }
  },
);

const handlers = [
  rest.get(`${HOST_URL}`, async (req, res, ctx) => {
    try {
      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );
      return delayedResponse(
        await getResponseWithErrorByChance(taskObjStr as string, getTasks, ctx),
      );
    } catch (error) {
      console.error(error);
      return delayedResponse(ctx.status(500, (error as Error).message));
    }
  }),
  rest.get(`${HOST_URL}/done`, async (req, res, ctx) => {
    return delayedResponse(ctx.json({ message: 'done' }));
  }),
  rest.get(`${HOST_URL}/detail/:id`, getDetailHandler),
  rest.post(`${HOST_URL}/detail`, async (req, res, ctx) => {
    try {
      const task = await req.json();

      // task cannot be validated in makeGetEndpoint
      // since req.json() can only be called once.
      const result = taskSchema.safeParse(task);
      if (!result.success) {
        const { issues } = result.error;
        return delayedResponse(ctx.status(400, createZodErrorMessage(issues)));
      }

      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );
      const updateTask = receiveTask(task);

      return delayedResponse(
        await getResponseWithErrorByChance(
          taskObjStr as string,
          updateTask,
          ctx,
        ),
      );
    } catch (error) {
      console.error(error);
      return delayedResponse(ctx.status(500, (error as Error).message));
    }
  }),
];

function getTasks(taskObjStr: string) {
  return Object.values(JSON.parse(taskObjStr));
}

function setTaskKey(key: string) {
  return (taskObjStr: string): Task | null =>
    JSON.parse(taskObjStr)[key] ? JSON.parse(taskObjStr)[key] : null;
}

function receiveTask(task: Task) {
  return async (taskObjStr: string) => {
    const taskObj = JSON.parse(taskObjStr);

    if (!taskObj[task.id]) return null;

    taskObj[task.id] = task;

    await AsyncStorage.setItem(
      STORAGE_KEY_TASK_MAP_OBJECT,
      JSON.stringify(taskObj),
    );

    return task;
  };
}

export { handlers };
