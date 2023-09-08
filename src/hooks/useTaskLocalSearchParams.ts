import { useLocalSearchParams } from 'expo-router';

import { TaskSearchParams } from 'src/navigation/types';

export function useTaskLocalSearchParams() {
  return useLocalSearchParams<TaskSearchParams>();
}
