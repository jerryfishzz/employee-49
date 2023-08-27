import { RowProvider, useRow } from './context';
import { Text, View, ViewProps } from 'src/components/Themed';
import { RowTextProps } from './types';

export function Row({ children, ...props }: ViewProps) {
  return (
    <RowProvider value={null}>
      <View {...props}>{children}</View>
    </RowProvider>
  );
}

function RowText({
  color,
  testID,
  children,
  textProps: { style, ...props } = {},
}: RowTextProps) {
  useRow('<Row.Text />');

  return (
    <View testID={testID}>
      <Text {...props} style={[style, { color }]}>
        {children}
      </Text>
    </View>
  );
}

Row.Text = RowText;
