import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

import { Row } from './ui';

export interface Block {
  type: 'text' | 'icon';
  variant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: ViewStyle;
  content: ReactNode;
}

export interface ContentRowProps {
  blocks: Block[];
  testID: string;
  style?: ViewStyle;
}

export function ContentRow({ testID, blocks, style }: ContentRowProps) {
  return (
    <Row testID={`row-${testID}`} style={[styles.row, style]}>
      {blocks.map(({ variant, textStyle, viewStyle, content, type }, index) =>
        type === 'text' ? (
          <Row.Text
            key={index}
            variant={variant}
            viewStyle={viewStyle}
            textStyle={textStyle}
          >
            {content}
          </Row.Text>
        ) : (
          <Row.Icon key={index}>{content}</Row.Icon>
        ),
      )}
    </Row>
  );
}

export function ContentRowAndroid({ testID, blocks }: ContentRowProps) {
  return <ContentRow testID={testID} blocks={blocks} style={styles.android} />;
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
    marginBottom: 6,
    marginTop: 6,
  },
});
