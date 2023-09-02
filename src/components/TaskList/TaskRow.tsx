import { List } from 'react-native-paper';

import { Item, TaskRowProps } from './types';
import { Title } from './Title';

export function TaskRow<T extends Item>({ item }: TaskRowProps<T>) {
  return <List.Item title={<Title item={item} />} />;
}
