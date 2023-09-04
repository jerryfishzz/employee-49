const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const paySauceColor = {
  hotChilli: '#D84727',
  white: '#FFFFFF',
  aioli: '#F8EDC9',
  blueberry: '#2E5266',
  mint: '#8EA604',
  gravy: '#4F3130',
  lightGrey: '#EAEAEA',
  midGrey: '#4C4C47',
  darkGrey: '#2D2D2A',
};

export const paySauceThemeLight = {
  colors: {
    borderBottom: paySauceColor.lightGrey,
  },
};

export const paySauceThemeDark = {
  colors: {
    borderBottom: paySauceColor.white,
  },
};
