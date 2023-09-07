import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { List } from 'react-native-paper';
import date from 'date-and-time';

import { Text, View } from 'src/components/Themed';
import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';
import { taskMap } from 'src/data/task';
import { Dot, RowDotAndroid } from 'src/components/ui';
import { PRIORITY } from 'src/constants/Priority';

export function Detail() {
  const { id } = useLocalSearchParams();
  const task = taskMap.get(id as string);

  const statusRow: Block[] = [
    {
      type: 'text',
      content: 'Status',
      variant: 'titleLarge',
      viewStyle: {
        flex: 1,
      },
    },
    {
      type: 'text',
      variant: 'titleMedium',
      content: task?.status,
    },
  ];

  const dueRow: Block[] = [
    {
      type: 'text',
      content: 'Due',
      variant: 'titleLarge',
      viewStyle: {
        flex: 1,
      },
    },
    {
      type: 'text',
      variant: 'titleMedium',
      content: task && date.format(new Date(task.due), 'D MMMM, YYYY'),
    },
  ];

  const priorityRow: Block[] = [
    {
      type: 'text',
      content: 'Priority',
      variant: 'titleLarge',
      viewStyle: {
        flex: 1,
      },
    },
    {
      type: 'text',
      variant: 'titleMedium',
      content: task && date.format(new Date(task.due), 'D MMMM, YYYY'),
    },
  ];

  const priorityIcon: Block = {
    type: 'icon',
    content: task && (
      <RowDotAndroid iconColor={PRIORITY[task.priority].color} />
    ),
  };

  const descriptionRow: Block[] = [
    {
      type: 'text',
      content: task?.description,
      variant: 'titleMedium',
      viewStyle: {
        flex: 1,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Detail Screen</Text>
        <Text>ID: {id}</Text>
        {Platform.OS === 'android' ? (
          <>
            <ContentRowAndroid blocks={statusRow} />
            <ContentRowAndroid blocks={dueRow} />
            <ContentRowAndroid blocks={[...priorityRow, priorityIcon]} />
            <ContentRowAndroid blocks={descriptionRow} />
          </>
        ) : (
          <>
            <List.Item title={<ContentRow blocks={statusRow} />} />
            <List.Item title={<ContentRow blocks={dueRow} />} />
            <List.Item
              title={<ContentRow blocks={priorityRow} />}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={() => <Dot iconColor={PRIORITY[task.priority].color} />}
                />
              )}
            />
            <List.Item title={<ContentRow blocks={descriptionRow} />} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
