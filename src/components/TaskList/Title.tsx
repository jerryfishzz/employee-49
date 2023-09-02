import { View } from '../Themed';
import { Row } from '../ui/Row';
import { Item, TitleProps } from './types';

export function Title<T extends Item>({ item }: TitleProps<T>) {
  return (
    <Row
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        // justifyContent: 'space-between',
      }}
    >
      <Row.Text
        variant="titleLarge"
        testID={`row-${item.id}`}
        viewStyle={{ flex: 1 }}
      >
        {item.title}
      </Row.Text>

      <Row.Text variant="titleMedium">{item.id}</Row.Text>
    </Row>
  );
}
