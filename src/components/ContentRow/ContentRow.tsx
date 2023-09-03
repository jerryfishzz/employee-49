import { ReactNode } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

import { Row } from '../ui/Row';

export interface Block {
  variant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: ViewStyle;
  content: ReactNode;
}

interface ContentRowProps {
  blocks: Block[];
  testID: string;
}

export function ContentRow({ testID, blocks }: ContentRowProps) {
  return (
    <Row
      testID={`row-${testID}`}
      style={[styles.row, Platform.OS === 'android' && styles.android]}
    >
      {blocks.map(({ variant, textStyle, viewStyle, content }, index) => (
        <Row.Text
          key={index}
          variant={variant}
          viewStyle={viewStyle}
          textStyle={textStyle}
        >
          {content}
        </Row.Text>
      ))}
    </Row>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Set full width on web
  },
  android: {
    paddingRight: 24,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    marginBottom: 6,
    marginTop: 6,
  },
});
