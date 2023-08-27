import { ReactNode } from 'react';
import { FlexStyle, TextStyle } from 'react-native';

import { TextProps, ViewProps } from 'src/components/Themed';

export type RowTextProps = {
  testID?: string;
  color?: TextStyle['color'];
  flex?: FlexStyle['flex'];
  children: ReactNode;
  textProps?: TextProps;
  viewProps?: ViewProps;
};
