import { Redirect, Stack } from 'expo-router';

import { taskMap } from 'src/data/task';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';

export default function Route() {
  const { id } = useTaskLocalSearchParams();
  const task = taskMap.get(id);

  if (task === undefined) {
    return <Redirect href="/404" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: task.title.toUpperCase(),
        }}
      />
      <Detail />
    </>
  );
}
