import { FlatList, Platform } from 'react-native';

import { TaskRow } from './TaskRow';
import { Item, TaskListProps } from './types';
import { Block, ContentRowAndroid } from '../ContentRow';

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const titleBlock: Block = {
          content: item.title,
          variant: 'titleLarge',
          viewStyle: {
            flex: 1,
          },
        };

        const idBlock: Block = {
          content: item.id,
          variant: 'titleMedium',
        };

        if (Platform.OS === 'android')
          return (
            <ContentRowAndroid
              testID={item.id}
              blocks={[titleBlock, idBlock]}
            />
          );

        return <TaskRow item={item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
