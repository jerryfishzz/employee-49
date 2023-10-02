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
    normal: 'rgb(86, 101, 0)',
    onNormal: 'rgb(255, 255, 255)',
    normalContainer: 'rgb(212, 239, 87)',
    onNormalContainer: 'rgb(24, 30, 0)',
    low: 'rgb(0, 102, 138)',
    onLow: 'rgb(255, 255, 255)',
    lowContainer: 'rgb(196, 231, 255)',
    onLowContainer: 'rgb(0, 30, 44)',
    high: 'rgb(178, 44, 13)',
    onHigh: 'rgb(255, 255, 255)',
    highContainer: 'rgb(255, 218, 210)',
    onHighContainer: 'rgb(61, 6, 0)',
  },
};

export const paySauceThemeDark = {
  colors: {
    borderBottom: paySauceColor.white,
    normal: 'rgb(184, 210, 60)',
    onNormal: 'rgb(43, 52, 0)',
    normalContainer: 'rgb(64, 76, 0)',
    onNormalContainer: 'rgb(212, 239, 87)',
    low: 'rgb(124, 208, 255)',
    onLow: 'rgb(0, 52, 74)',
    lowContainer: 'rgb(0, 76, 105)',
    onLowContainer: 'rgb(196, 231, 255)',
    high: 'rgb(255, 180, 163)',
    onHigh: 'rgb(99, 15, 0)',
    highContainer: 'rgb(140, 25, 0)',
    onHighContainer: 'rgb(255, 218, 210)',
  },
};
