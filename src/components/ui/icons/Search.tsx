import { MaterialIcons } from '@expo/vector-icons';

import { IconBase } from './IconBase';
import { DEFAULT_SIZE } from './constants';
import { IconProps } from './types';
import { useAppTheme } from 'src/hooks/useAppTheme';

export function Search({ style, size, iconColor }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <IconBase style={style}>
      <MaterialIcons
        name="search"
        size={size ? size : DEFAULT_SIZE}
        color={iconColor ? iconColor : colors.onBackground}
        style={style}
      />
    </IconBase>
  );
}
