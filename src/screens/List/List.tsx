import {
  ColorValue,
  FlatList,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import date from 'date-and-time';
import { List as PaperList } from 'react-native-paper';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { View } from 'src/components/Themed';
import { paySauceColor } from 'src/data/Colors';
import { PRIORITY } from 'src/data/Priority';
import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';
import { Task } from 'src/utils/schema';
import {
  Dot,
  Forward,
  RowDotAndroid,
  RowForwardAndroid,
} from 'src/components/ui';
import { useAppTheme } from 'src/hooks/useAppTheme';
import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';

const { hotChilli, midGrey, mint } = paySauceColor;

type ListProps = {
  data: Task[];
} & RootTabScreenProps<keyof RootTabParamList>;

export function List({ data, route }: ListProps) {
  const {
    colors: { borderBottom },
  } = useAppTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item: { id, title, due, priority }, index }) => {
          const priorityColor = PRIORITY[priority].color;
          const dueColor =
            route.name === 'index'
              ? isOverdue(due)
                ? hotChilli
                : midGrey
              : mint;

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

          const dueBlock: Block = {
            type: 'text',
            content: date.format(new Date(due), 'D MMM'),
            variant: 'titleMedium',
            textStyle: {
              color: dueColor,
            },
          };

          const dotBlockAndroid: Block = {
            type: 'icon',
            content: <RowDotAndroid iconColor={priorityColor} />,
          };

          const forwardBlockAndroid: Block = {
            type: 'icon',
            content: <RowForwardAndroid style={styles.forward} />,
          };

          const borderBottomStyle = getBorderBottomStyle(
            borderBottom,
            index,
            data.length,
          );

          if (Platform.OS === 'android')
            return (
              <Link href={`/detail/${id}`} asChild>
                <TouchableOpacity>
                  <ContentRowAndroid
                    testID={id}
                    blocks={[
                      dotBlockAndroid,
                      titleBlock,
                      dueBlock,
                      forwardBlockAndroid,
                    ]}
                    style={borderBottomStyle}
                  />
                </TouchableOpacity>
              </Link>
            );

          return (
            <Link href={`/detail/${id}`} asChild>
              <TouchableOpacity>
                <PaperList.Item
                  title={
                    <ContentRow testID={id} blocks={[titleBlock, dueBlock]} />
                  }
                  left={(props) => (
                    <PaperList.Icon
                      {...props}
                      icon={() => <Dot iconColor={priorityColor} />}
                    />
                  )}
                  right={({ style, ...props }) => (
                    <PaperList.Icon
                      style={[style, styles.forward]}
                      {...props}
                      icon={() => <Forward />}
                    />
                  )}
                  style={[borderBottomStyle, styles.listPadding]}
                />
              </TouchableOpacity>
            </Link>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

function isOverdue(due: Task['due']) {
  return new Date(due) < new Date() ? true : false;
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
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  listPadding: {
    paddingVertical: 12,
  },
  forward: {
    marginLeft: 4,
  },
});
