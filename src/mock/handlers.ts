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
import { strToNum } from 'src/utils/helpers';
import { Task, taskSchema } from 'src/utils/schema';

const { EXPO_PUBLIC_MOCKING_ERROR_CHANCE } = process.env;
const errorChance =
  EXPO_PUBLIC_MOCKING_ERROR_CHANCE === undefined
    ? 0
    : strToNum(EXPO_PUBLIC_MOCKING_ERROR_CHANCE);

const getResponseWithErrorByChance = createErrorChangeOnResponse(errorChance);

const getDetailHandler = makeGetEndpoint(
  z.object({ id: z.string() }),
  null,
  async (req, res, ctx) => {
    try {
      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );
      const getTaskByKeyFromTaskObjStr = setTaskKey(req.params.id);
      return delayedResponse(
        getResponseWithErrorByChance(
          taskObjStr as string,
          getTaskByKeyFromTaskObjStr,
          ctx,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

const postDetailHandler = makeGetEndpoint(
  null,
  taskSchema,
  async (req, res, ctx) => {
    try {
      const task = await req.json();

      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );
      const taskObj = JSON.parse(taskObjStr as string);
      taskObj[task.id] = task;

      await AsyncStorage.setItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
        JSON.stringify(taskObj),
      );

      return delayedResponse(ctx.json(task));
    } catch (error) {
      console.error(error);
      throw error;
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
        getResponseWithErrorByChance(
          taskObjStr as string,
          parseTaskObjStrToTasks,
          ctx,
        ),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  rest.get(`${HOST_URL}/done`, async (req, res, ctx) => {
    return delayedResponse(ctx.json({ message: 'done' }));
  }),
  rest.get(`${HOST_URL}/detail/:id`, getDetailHandler),
  rest.post(`${HOST_URL}/detail`, postDetailHandler),
];

function parseTaskObjStrToTasks(taskObjStr: string) {
  return Object.values(JSON.parse(taskObjStr));
}

function setTaskKey(key: string) {
  return (taskObjStr: string): Task | undefined =>
    JSON.parse(taskObjStr)[key] ? JSON.parse(taskObjStr)[key] : undefined;
}

export { handlers };
