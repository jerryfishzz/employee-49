import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { z } from 'zod';

import { RootLayoutNav } from 'src/navigation/RootLayoutNav';
import { useMock } from 'src/mock/useMock';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Validate custom env variables
const envVariable = z.object({
  EXPO_PUBLIC_API_MOCKING: z.optional(z.enum(['true', 'false'])),
  EXPO_PUBLIC_MOCKING_DELAY: z.optional(z.string()),
  EXPO_PUBLIC_MOCKING_ERROR_CHANCE: z.optional(z.string()),
});
envVariable.parse(process.env);

// Add types of custom env variables under process.env
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('src/assets/fonts/SpaceMono-Regular.ttf'),
    MontserratLight: require('src/assets/fonts/Montserrat-Light.ttf'),
    MontserratBold: require('src/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('src/assets/fonts/Montserrat-ExtraLight.ttf'),
    LobsterRegular: require('src/assets/fonts/Lobster-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [mockLoaded] = useMock();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && mockLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, mockLoaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
