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
    // ...viewOthers and ...textOthers will overwrite the same prop appearing earlier.
    // So do viewStyle and textStyle.
    <View testID={testID} style={[{ flex }, viewStyle]} {...viewOthers}>
      <Text style={[{ color }, textStyle]} {...textOthers}>
        {children}
      </Text>
    </View>
  );
}

Row.Text = RowText;
