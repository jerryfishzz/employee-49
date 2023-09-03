import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

export interface IconProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  iconColor?: string | OpaqueColorValue;
}
