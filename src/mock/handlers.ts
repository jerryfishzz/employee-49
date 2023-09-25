import AsyncStorage from '@react-native-async-storage/async-storage';
import { rest } from 'msw';

import { HOST_URL } from 'src/data/host';
import { STORAGE_KEY_TASKS } from './setUpDB';
import { delayedResponse } from './utils';

const handlers = [
  rest.get(`${HOST_URL}`, async (req, res, ctx) => {
    try {
      const tasks = await AsyncStorage.getItem(STORAGE_KEY_TASKS);
      return delayedResponse(ctx.json(JSON.parse(tasks as string)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  rest.get(`${HOST_URL}/done`, async (req, res, ctx) => {
    return delayedResponse(ctx.json({ message: 'done' }));
  }),
  rest.get(`${HOST_URL}/detail/:id`, async (req, res, ctx) => {
    return delayedResponse(ctx.json({ message: 'detail' }));
  }),
];

export { handlers };
