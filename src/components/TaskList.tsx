import { FlatList, Platform } from 'react-native';
import { List } from 'react-native-paper';

import { Block, ContentRow, ContentRowAndroid } from './ContentRow';
import { Dot, Forward, RowDotAndroid, RowForwardAndroid } from './ui';
import { paySauceColor } from 'src/constants/Colors';
import { useAppTheme } from 'src/hooks/useAppTheme';

export interface Item {
  id: string;
  title: string;
}

interface TaskListProps<T extends Item> {
  data: T[];
}

const { hotChilli, mint, blueberry } = paySauceColor;

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  const {
    colors: { borderBottom },
  } = useAppTheme();

  return (
    <FlatList
      data={data}
      renderItem={({ item: { id, title }, index }) => {
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
              borderBottomColor: borderBottom,
              borderBottomWidth: index === data.length - 1 ? 0 : 2,
            }}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
