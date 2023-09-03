import { Ionicons } from '@expo/vector-icons';

import { IconBase } from './IconBase';
import { DEFAULT_FORWARD_COLOR, DEFAULT_SIZE } from './constants';
import { IconProps } from './types';

export function Forward({ style, size, iconColor }: IconProps) {
  return (
    <IconBase style={style}>
      <Ionicons
        name="chevron-forward"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : DEFAULT_FORWARD_COLOR}
      />
    </IconBase>
  );
}
