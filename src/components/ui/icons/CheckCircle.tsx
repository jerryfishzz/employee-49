import { FontAwesome } from '@expo/vector-icons';

import { IconBase } from './IconBase';
import { DEFAULT_SIZE } from './constants';
import { IconProps } from './types';
import { useAppTheme } from 'src/hooks/useAppTheme';

export function CheckCircle({ style, size, iconColor }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <IconBase style={style}>
      <FontAwesome
        name="check-circle"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : colors.primary}
        style={style}
      />
    </IconBase>
  );
}
