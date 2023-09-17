import { Text } from 'react-native-paper';

import { rowContext, useRow } from './context';
import { View, ViewProps } from 'src/components/Themed';
import { RowIconProps, RowTextProps } from './types';

export function Row({ children, ...props }: ViewProps) {
  return (
    <rowContext.Provider value={null}>
      <View {...props}>{children}</View>
    </rowContext.Provider>
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

function RowIcon({ children }: RowIconProps) {
  useRow('<Row.Icon />');

  return <>{children}</>;
}

Row.Text = RowText;
Row.Icon = RowIcon;
