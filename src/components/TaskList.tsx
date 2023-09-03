import { FlatList, Platform } from 'react-native';
import { List } from 'react-native-paper';

import { Block, ContentRow, ContentRowAndroid } from './ContentRow';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { Dot, RowDotAndroid } from './ui';

export interface Item {
  id: string;
  title: string;
}

interface TaskListProps<T extends Item> {
  data: T[];
}

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  const {
    colors: { hotChilli, mint, blueberry },
  } = useAppTheme();

  return (
    <FlatList
      data={data}
      renderItem={({ item: { id, title } }) => {
        const titleBlock: Block = {
          type: 'text',
          content: title,
          variant: 'titleLarge',
          viewStyle: {
            flex: 1,
            paddingLeft: Platform.OS === 'android' ? 16 : 0,
          },
        };

        const idBlock: Block = {
          type: 'text',
          content: id,
          variant: 'titleMedium',
          textStyle: {
            color: hotChilli,
          },
        };

        const dotBlockAndroid: Block = {
          type: 'icon',
          content: <RowDotAndroid iconColor={mint} />,
        };

        if (Platform.OS === 'android')
          return (
            <ContentRowAndroid
              testID={id}
              blocks={[dotBlockAndroid, titleBlock, idBlock]}
            />
          );

        return (
          <List.Item
            title={<ContentRow testID={id} blocks={[titleBlock, idBlock]} />}
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => <Dot iconColor={blueberry} />}
              />
            )}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
