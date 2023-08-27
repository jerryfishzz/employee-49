import { CSSProperties, ReactNode } from 'react';

import { TextProps } from 'src/components/Themed';

export type RowTextProps = {
  testID?: string;
  color?: CSSProperties['color'];
  children: ReactNode;
  textProps: Exclude<TextProps, 'children'>;
};
