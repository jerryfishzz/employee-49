import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { IconBase } from './IconBase';
import { DEFAULT_SIZE } from './constants';
import { IconProps } from './types';
import { paySauceColor } from 'src/data/Colors';
import { getStyle } from '../../utils/getStyle';

export function Error({ style, size, iconColor }: IconProps) {
  return (
    <IconBase style={style}>
      <MaterialIcons
        name="error"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : paySauceColor.white}
        style={getStyle({
          baseStyle: styles.backgroundColor,
          receivedStyle: style,
        })}
      />
    </IconBase>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: paySauceColor.blueberry,
  },
});
