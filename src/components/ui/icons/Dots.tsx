import { Octicons } from '@expo/vector-icons';
import {
  OpaqueColorValue,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { IconBase } from './IconBase';

interface DotProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  iconColor?: string | OpaqueColorValue;
}

type RowDotAndroidProps = DotProps;

export function Dot({ style, size, iconColor }: DotProps) {
  return (
    <IconBase style={style}>
      <Octicons
        name="dot-fill"
        size={size ? size : 24}
        color={iconColor ? iconColor : 'yellow'}
      />
    </IconBase>
  );
}

export function RowDotAndroid({ style, size, iconColor }: RowDotAndroidProps) {
  return (
    <Dot
      style={[styles.rowDotAndroid, style]}
      size={size}
      iconColor={iconColor}
    />
  );
}

const styles = StyleSheet.create({
  rowDotAndroid: {
    marginLeft: 16,
  },
});
