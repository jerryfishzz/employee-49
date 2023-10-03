import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Notification } from 'src/components/Notification';
import { EmployeeProvider } from 'src/context/employee';

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

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
          <EmployeeProvider
            initialState={{ notification: { visible: '', notice: '' } }}
          >
            <Notification />
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
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="detail/[id]" />
            </Stack>
          </EmployeeProvider>
        </SafeAreaProvider>
      </PaperProvider>
      {Platform.OS === 'web' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
