import { FlatList, Platform } from 'react-native';
import { List } from 'react-native-paper';

import { Item, TaskListProps } from './types';
import { Block, ContentRow, ContentRowAndroid } from '../ContentRow';

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={({ item: { id, title } }) => {
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

        if (Platform.OS === 'android')
          return (
            <ContentRowAndroid testID={id} blocks={[titleBlock, idBlock]} />
          );

        return (
          <List.Item
            title={<ContentRow testID={id} blocks={[titleBlock, idBlock]} />}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
