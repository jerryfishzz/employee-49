import { Stack, useLocalSearchParams } from 'expo-router';

import { Detail } from 'src/screens/Detail';

export default function Route() {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: params.id as string }} />
      <Detail />
    </>
  );
}
