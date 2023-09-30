import { FC } from 'react';
import { IconProps } from '../ui/icons/types';
import { OpaqueColorValue } from 'react-native';

export type NoticeElement = {
  Icon: FC<IconProps>;
  size?: number;
  backgroundColor?: string | OpaqueColorValue | undefined;
  contentColor?: string | OpaqueColorValue | undefined;
};

export function getStyledIcon({
  Icon,
  size,
  backgroundColor,
  contentColor,
}: NoticeElement): JSX.Element {
  return (
    <Icon size={size} iconColor={contentColor} style={{ backgroundColor }} />
  );
}
