import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

import { Row } from './ui/Row';

interface Item {
  variant?: VariantProp<never>;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: ViewStyle;
  content: ReactNode;
}

interface ContentRowProps {
  items: Item[];
  testID: string;
}

export function ContentRow({ testID, items }: ContentRowProps) {
  return (
    <Row
      testID={`row-${testID}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Set full width on web
      }}
    >
      {items.map(({ variant, textStyle, viewStyle, content }, index) => (
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