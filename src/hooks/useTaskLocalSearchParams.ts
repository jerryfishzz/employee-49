import { useLocalSearchParams } from 'expo-router';

import { TaskSearchParams } from 'src/utils/navigation';

export function useTaskLocalSearchParams() {
  return useLocalSearchParams<TaskSearchParams>();
}
