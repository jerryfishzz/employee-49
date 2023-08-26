import { ReactNode } from 'react';

import { RowProvider, useRow } from './context';
import { Text, TextProps, View } from 'src/components/Themed';

export function Row({ children }: { children: ReactNode }) {
  return (
    <RowProvider value={null}>
      <View>{children}</View>
    </RowProvider>
  );
}

function RowText({ children, ...props }: TextProps) {
  useRow('<Row.Text />');
  return <Text {...props}>{children}</Text>;
}

Row.Text = RowText;
