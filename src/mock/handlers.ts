import AsyncStorage from '@react-native-async-storage/async-storage';
import { rest } from 'msw';

import { HOST_URL } from 'src/data/host';
import { STORAGE_KEY_TASK_MAP_OBJECT } from './setUpDB';
import { delayedResponse, createErrorChangeOnResponse } from './utils';
import { strToNum } from 'src/utils/helpers';

const { EXPO_PUBLIC_MOCKING_ERROR_CHANCE } = process.env;
const errorChance =
  EXPO_PUBLIC_MOCKING_ERROR_CHANCE === undefined
    ? 0
    : strToNum(EXPO_PUBLIC_MOCKING_ERROR_CHANCE);

const getResponseWithErrorByChance = createErrorChangeOnResponse(errorChance);

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
  rest.get(`${HOST_URL}/detail/:id`, async (req, res, ctx) => {
    try {
      const taskObjStr = await AsyncStorage.getItem(
        STORAGE_KEY_TASK_MAP_OBJECT,
      );

      const getTaskByKeyFromTaskObjStr = setTaskKey(req.params.id as string);
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
  }),
];

function parseTaskObjStrToTasks(taskObjStr: string) {
  return Object.values(JSON.parse(taskObjStr));
}

function setTaskKey(key: string) {
  return (taskObjStr: string) => JSON.parse(taskObjStr)[key];
}

export { handlers };
