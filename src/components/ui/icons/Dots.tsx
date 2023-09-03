import { Octicons } from '@expo/vector-icons';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Icon } from './Icon';

interface DotProps {
  style?: StyleProp<ViewStyle>;
}

export function Dot({ style }: DotProps) {
  return (
    <Icon style={style}>
      <Octicons name="dot-fill" size={24} color="yellow" />
    </Icon>
  );
}

export function RowDotAndroid() {
  return <Dot style={styles.rowDotAndroid} />;
}

const styles = StyleSheet.create({
  rowDotAndroid: {
    marginLeft: 16,
  },
});
