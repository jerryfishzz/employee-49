import { FlatList, Platform } from 'react-native';
import { List } from 'react-native-paper';

import { Block, ContentRow, ContentRowAndroid } from './ContentRow';
import { useAppTheme } from 'src/hooks/useAppTheme';

export interface Item {
  id: string;
  title: string;
}

interface TaskListProps<T extends Item> {
  data: T[];
}

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  const {
    colors: { hotChilli },
  } = useAppTheme();

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
          textStyle: {
            color: hotChilli,
          },
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
