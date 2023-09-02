import { Text } from 'react-native-paper';

import { RowProvider, useRow } from './context';
import { View, ViewProps } from 'src/components/Themed';
import { RowTextProps } from './types';

export function Row({ children, ...props }: ViewProps) {
  return (
    <RowProvider value={null}>
      <View {...props}>{children}</View>
    </RowProvider>
  );
}

function RowText({
  testID,
  variant,
  children,
  textStyle,
  viewStyle,
}: RowTextProps) {
  useRow('<Row.Text />');

  return (
    <View testID={testID} style={viewStyle}>
      <Text variant={variant} style={textStyle}>
        {children}
      </Text>
    </View>
  );
}

Row.Text = RowText;
