import { Stack } from 'expo-router';
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
} from 'src/data/Colors';

const fonts = configureFonts({
  config: {
    fontFamily: 'MontserratBold',
  },
});

const { hotChilli, white } = paySauceColor;

export function RootLayoutNav() {
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
            headerBackTitleVisible: false,
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
