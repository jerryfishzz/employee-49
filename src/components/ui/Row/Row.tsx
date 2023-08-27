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
  flex,
  testID,
  children,
  textProps = {},
  viewProps = {},
}: RowTextProps) {
  useRow('<Row.Text />');

  const { style: textStyle, ...textOthers } = textProps;
  const { style: viewStyle, ...viewOthers } = viewProps;

  return (
    // Put ...viewOthers at the beginning so that the same prop appearing later can overwrite it
    <View {...viewOthers} testID={testID} style={[viewStyle, { flex }]}>
      <Text {...textOthers} style={[textStyle, { color }]}>
        {children}
      </Text>
    </View>
  );
}

Row.Text = RowText;
