import { ComponentProps } from 'react';
import { Text as PaperText } from 'react-native-paper';

type TextProps = {
  fontFamily?:
    | 'SpaceMono'
    | 'MontserratLight'
    | 'MontserratBold'
    | 'MontserratExtraLight'
    | 'LobsterRegular';
} & ComponentProps<typeof PaperText>;

export function Text({ fontFamily, style, children, ...props }: TextProps) {
  return (
    <PaperText style={[style, { fontFamily }]} {...props}>
      {children}
    </PaperText>
  );
}
