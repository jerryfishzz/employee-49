import {
  ColorValue,
  FlatList,
  Platform,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { List } from 'react-native-paper';
import date from 'date-and-time';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

import { Block, ContentRow, ContentRowAndroid } from './ContentRow';
import { Dot, Forward, RowDotAndroid, RowForwardAndroid } from './ui';
import { paySauceColor } from 'src/data/Colors';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { PRIORITY } from 'src/data/Priority';
import { Task } from 'src/context/task.schema';
import { RootTabParamList } from 'src/navigation/types';

interface TaskListProps<T extends Task> {
  data: T[];
  routeName: keyof RootTabParamList;
}

function isOverdue(due: Task['due']) {
  return new Date(due) < new Date() ? true : false;
}

const { hotChilli, midGrey, mint } = paySauceColor;

export function TaskList<T extends Task>({
  data,
  routeName,
}: TaskListProps<T>) {
  const {
    colors: { borderBottom },
  } = useAppTheme();

  // Because tabs used here is not from expo router,
  // the route from usePathname will be quite slow.
  // So here use routes from react navigation top tabs.
  const filteredData = data.filter((task) =>
    routeName === 'index' ? task.status === 'toDo' : task.status === 'done',
  );

  return (
    <FlatList
      data={filteredData}
      renderItem={({ item: { id, title, due, priority }, index }) => {
        const priorityColor = PRIORITY[priority].color;
        const dueColor =
          routeName === 'index' ? (isOverdue(due) ? hotChilli : midGrey) : mint;

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
          filteredData.length,
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
              <List.Item
                title={
                  <ContentRow testID={id} blocks={[titleBlock, dueBlock]} />
                }
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={() => <Dot iconColor={priorityColor} />}
                  />
                )}
                right={({ style, ...props }) => (
                  <List.Icon
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
  forward: {
    marginLeft: 4,
  },
});
