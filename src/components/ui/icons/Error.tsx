import { MaterialIcons } from '@expo/vector-icons';

import { IconBase } from './IconBase';
import { DEFAULT_SIZE } from './constants';
import { IconProps } from './types';
import { useAppTheme } from 'src/hooks/useAppTheme';

export function Error({ style, size, iconColor }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <IconBase style={style}>
      <MaterialIcons
        name="error"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : colors.error}
        style={style}
      />
    </IconBase>
  );
}
