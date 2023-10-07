import { FlatList, Platform, RefreshControl, StyleSheet } from 'react-native';
import date from 'date-and-time';
import { List as PaperList } from 'react-native-paper';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dispatch, SetStateAction } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import { View } from 'src/components/Themed';
import { paySauceColor } from 'src/data/Colors';
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
import { useRefreshing } from 'src/hooks/useRefreshing';
import { Swipe } from 'src/features/Swipe/Swipe';

const { midGrey } = paySauceColor;

type ListProps = {
  data: Task[];
  setEnabled: Dispatch<SetStateAction<boolean>>;
  fetchStatus: UseQueryResult['fetchStatus'];
} & RootTabScreenProps<keyof RootTabParamList>;

export function List({
  data,
  setEnabled,
  fetchStatus,
  ...routeProps
}: ListProps) {
  const { colors } = useAppTheme();
  const { borderBottom, high, normal, background } = colors;

  const { route } = routeProps;

  const [refreshing, onRefresh] = useRefreshing(setEnabled, fetchStatus);

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }) => {
          const { id, title, due, priority } = item;

          const dueColor =
            route.name === 'index' ? (isOverdue(due) ? high : midGrey) : normal;

          const titleBlock: Block = {
            type: 'text',
            content: title,
            variant: 'titleLarge',
            viewStyle: {
              flex: 1,
              paddingLeft: Platform.OS === 'android' ? 16 : 0,
              paddingRight: 12,
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
            content: <RowDotAndroid iconColor={colors[priority]} />,
          };

          const forwardBlockAndroid: Block = {
            type: 'icon',
            content: <RowForwardAndroid style={styles.forward} />,
          };

          if (Platform.OS === 'android')
            return (
              <Swipe {...routeProps} setEnabled={setEnabled} task={item}>
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
                      style={[
                        { borderBottomColor: borderBottom },
                        styles.bottomBorder,
                      ]}
                    />
                  </TouchableOpacity>
                </Link>
              </Swipe>
            );

          return (
            <Swipe {...routeProps} setEnabled={setEnabled} task={item}>
              <Link href={`/detail/${id}`} asChild>
                <TouchableOpacity>
                  <PaperList.Item
                    title={
                      <ContentRow testID={id} blocks={[titleBlock, dueBlock]} />
                    }
                    left={(props) => (
                      <PaperList.Icon
                        {...props}
                        icon={() => <Dot iconColor={colors[priority]} />}
                      />
                    )}
                    right={({ style, ...props }) => (
                      <PaperList.Icon
                        style={[style, styles.forward]}
                        {...props}
                        icon={() => <Forward />}
                      />
                    )}
                    style={[
                      {
                        borderBottomColor: borderBottom,
                        backgroundColor: background,
                      },
                      styles.listPadding,
                      styles.bottomBorder,
                    ]}
                  />
                </TouchableOpacity>
              </Link>
            </Swipe>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  bottomBorder: {
    borderBottomWidth: 2,
  },
  listPadding: {
    paddingVertical: 12,
  },
  forward: {
    marginLeft: 4,
  },
});
