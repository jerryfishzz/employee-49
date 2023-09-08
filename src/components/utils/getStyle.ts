import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type GetStyleParams<
  T extends StyleProp<V>,
  U extends StyleProp<V>,
  V extends TextStyle | ViewStyle,
> = {
  baseStyle?: T;
  receivedStyle?: U;
};

export function getStyle<
  T extends StyleProp<V>,
  U extends StyleProp<V>,
  V extends TextStyle | ViewStyle,
>({
  baseStyle,
  receivedStyle,
}: GetStyleParams<T, U, V>): StyleProp<V> | undefined {
  return receivedStyle
    ? Array.isArray(receivedStyle)
      ? Array.isArray(baseStyle)
        ? [...baseStyle, ...receivedStyle]
        : [baseStyle, ...receivedStyle]
      : Array.isArray(baseStyle)
      ? [...baseStyle, receivedStyle]
      : [baseStyle, receivedStyle]
    : baseStyle;
}
