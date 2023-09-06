import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  paySauceColor,
  paySauceThemeDark,
  paySauceThemeLight,
} from 'src/constants/Colors';

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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('src/assets/fonts/SpaceMono-Regular.ttf'),
    MontserratLight: require('src/assets/fonts/Montserrat-Light.ttf'),
    MontserratBold: require('src/assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraLight: require('src/assets/fonts/Montserrat-ExtraLight.ttf'),
    LobsterRegular: require('src/assets/fonts/Lobster-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const fonts = configureFonts({
  config: {
    fontFamily: 'MontserratBold',
  },
});

const { hotChilli, white } = paySauceColor;

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const paperColorTheme =
    colorScheme === 'dark'
      ? {
          ...MD3DarkTheme,
          colors: {
            ...MD3DarkTheme.colors,
            ...paySauceThemeDark.colors,
          },
        }
      : {
          ...MD3LightTheme,
          colors: {
            ...MD3LightTheme.colors,
            ...paySauceThemeLight.colors,
          },
        };
  const paperTheme = { ...paperColorTheme, fonts };

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: hotChilli,
            },
            headerTintColor: white,
            headerTitleStyle: {
              fontFamily: 'MontserratBold',
            },
            headerShadowVisible: false, // Hide the bottom line
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: 'TASKS' }} />
          <Stack.Screen name="detail/[id]" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
