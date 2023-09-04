import {
  ColorValue,
  FlatList,
  Platform,
  ViewStyle,
  StyleSheet,
} from 'react-native';
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
          textStyle: {
            fontSize: 20,
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

        const borderBottomStyle = getBorderBottomStyle(
          borderBottom,
          index,
          data.length,
        );

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
              style={borderBottomStyle}
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
            style={[borderBottomStyle, styles.listPadding]}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

function getBorderBottomStyle(
  color: ColorValue,
  index: number,
  dataLength: number,
): ViewStyle {
  return {
    borderBottomColor: color,
    borderBottomWidth: index === dataLength - 1 ? 0 : 2,
  };
}

const styles = StyleSheet.create({
  listPadding: {
    paddingVertical: 12,
  },
});
