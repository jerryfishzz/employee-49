import { Stack } from 'expo-router';

import { Info } from 'src/screens/Info';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Info
        type="404"
        msg="This screen doesn't exist."
        secondMsg="Go to home screen!"
      />
    </>
  );
}
