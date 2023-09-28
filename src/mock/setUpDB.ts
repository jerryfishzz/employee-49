import AsyncStorage from '@react-native-async-storage/async-storage';
import { faker } from '@faker-js/faker';

import { createFakeDataArray, taskBuilder } from './builder';
import { arrayToMap } from './utils';

export const STORAGE_KEY_TASKS = '@EMPLOYEE_TASKS';
export const STORAGE_KEY_TASK_MAP_OBJECT = '@EMPLOYEE_TASK_MAP_OBJECT';

export async function setUpDB() {
  const tasks = createFakeDataArray(
    taskBuilder,
    faker.number.int({ min: 10, max: 20 }),
  );

  try {
    await AsyncStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    await AsyncStorage.setItem(
      STORAGE_KEY_TASK_MAP_OBJECT,
      JSON.stringify(Object.fromEntries(arrayToMap(tasks, 'id'))),
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
