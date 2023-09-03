import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

import { View } from '../../Themed';

interface IconProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function IconBase({ style, children }: IconProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
