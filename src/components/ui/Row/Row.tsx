import { RowProvider, useRow } from './context';
import { Text, TextProps, View, ViewProps } from 'src/components/Themed';

export function Row({ children, ...props }: ViewProps) {
  return (
    <RowProvider value={null}>
      <View {...props}>{children}</View>
    </RowProvider>
  );
}

function RowText({ children, ...props }: TextProps) {
  useRow('<Row.Text />');
  return <Text {...props}>{children}</Text>;
}

Row.Text = RowText;
