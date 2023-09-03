import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

export type RowTextProps = {
  testID?: string;
  children: ReactNode;
  variant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: ViewStyle;
};

export type RowIconProps = {
  children: ReactNode;
};
