import { StyleSheet } from 'react-native';

import { View } from '../../Themed';
import { getStyle } from '../helpers';
import { IconBaseProps } from './types';

export function IconBase({ style, children }: IconBaseProps) {
  return (
    <View
      style={getStyle({ baseStyle: styles.container, receivedStyle: style })}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
