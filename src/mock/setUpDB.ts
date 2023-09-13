import AsyncStorage from '@react-native-async-storage/async-storage';
import { faker } from '@faker-js/faker';

import { createFakeDataArray, taskBuilder } from './builder';

const STORAGE_KEY_TASKS = 'EMPLOYEE_TASKS';

export async function setUpDB() {
  const tasks = createFakeDataArray(
    taskBuilder,
    faker.number.int({ min: 10, max: 20 }),
  );

  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
