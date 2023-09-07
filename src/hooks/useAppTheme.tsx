import { MD3LightTheme, useTheme } from 'react-native-paper';

import { paySauceThemeLight } from 'src/data/Colors';

const { colors } = paySauceThemeLight;

const theme = {
  ...MD3LightTheme,
  colors,
};

type AppTheme = typeof theme;

// Typed custom theme hook
function useAppTheme() {
  return useTheme<AppTheme>();
}

export { useAppTheme };
