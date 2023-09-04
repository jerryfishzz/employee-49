import { FlatList, Platform } from 'react-native';
import { List } from 'react-native-paper';

import { Block, ContentRow, ContentRowAndroid } from './ContentRow';
import { Dot, Forward, RowDotAndroid, RowForwardAndroid } from './ui';
import { paySauceColor } from 'src/constants/Colors';

export interface Item {
  id: string;
  title: string;
}

interface TaskListProps<T extends Item> {
  data: T[];
}

const { hotChilli, mint, blueberry } = paySauceColor;

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
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

        const forwardBlockAndroid: Block = {
          type: 'icon',
          content: <RowForwardAndroid />,
        };

        if (Platform.OS === 'android')
          return (
            <ContentRowAndroid
              testID={id}
              blocks={[
                dotBlockAndroid,
                titleBlock,
                idBlock,
                forwardBlockAndroid,
              ]}
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
            right={(props) => <List.Icon {...props} icon={() => <Forward />} />}
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 2,
            }}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
