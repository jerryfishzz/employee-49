import { Octicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { IconBase } from './IconBase';
import { IconProps } from './types';
import { DEFAULT_DOT_COLOR, DEFAULT_SIZE } from './constants';

export function Dot({ style, size, iconColor }: IconProps) {
  return (
    <IconBase style={style}>
      <Octicons
        name="dot-fill"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : DEFAULT_DOT_COLOR}
      />
    </IconBase>
  );
}

export function RowDotAndroid({ style, ...props }: IconProps) {
  return <Dot style={[styles.rowDotAndroid, style]} {...props} />;
}

const styles = StyleSheet.create({
  rowDotAndroid: {
    marginLeft: 16,
  },
});
