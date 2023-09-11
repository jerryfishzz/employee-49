import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_TASKS = 'EMPLOYEE_TASKS';

export async function setData() {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(
      STORAGE_KEY_TASKS,
      JSON.stringify({ task: 'jerry' }),
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
