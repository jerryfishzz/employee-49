import { Stack, useLocalSearchParams } from 'expo-router';

import { taskMap } from 'src/data/task';
import { Detail } from 'src/screens/Detail';

export default function Route() {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: taskMap.get(params.id as string)?.title.toUpperCase(),
        }}
      />
      <Detail />
    </>
  );
}
