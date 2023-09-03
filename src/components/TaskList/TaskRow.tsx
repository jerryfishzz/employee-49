import { List } from 'react-native-paper';

import { Item, TaskRowProps } from './types';
import { Title } from './Title';
import { Block, ContentRow } from '../ContentRow/ContentRow';

export function TaskRow<T extends Item>({
  item: { title, id },
}: TaskRowProps<T>) {
  const titleBlock: Block = {
    content: title,
    variant: 'titleLarge',
    viewStyle: {
      flex: 1,
    },
  };

  const idBlock: Block = {
    content: id,
    variant: 'titleMedium',
  };

  return (
    <List.Item
      title={<ContentRow testID={id} blocks={[titleBlock, idBlock]} />}
    />
  );
}
