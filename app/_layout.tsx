import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';

import { paySauceThemeDark, paySauceThemeLight } from 'src/constants/Colors';

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

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  materialLight: { ...MD3LightTheme, colors: paySauceThemeLight.colors },
});
const { DarkTheme: AdaptedDArkTheme } = adaptNavigationTheme({
  reactNavigationDark: DarkTheme,
  materialDark: { ...MD3DarkTheme, colors: paySauceThemeDark.colors },
});

const fonts = configureFonts({
  config: {
    fontFamily: 'MontserratLight',
  },
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const paperColorTheme =
    colorScheme === 'dark'
      ? {
          ...MD3DarkTheme,
          colors: paySauceThemeDark.colors,
        }
      : {
          ...MD3LightTheme,
          colors: paySauceThemeLight.colors,
        };
  const paperTheme = { ...paperColorTheme, fonts };

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider
        value={colorScheme === 'dark' ? AdaptedDArkTheme : LightTheme}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: 'TASKS' }} />
          <Stack.Screen name="detail" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
