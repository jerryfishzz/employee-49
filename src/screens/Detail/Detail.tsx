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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Detail Screen</Text>
        <Text>ID: {id}</Text>
        {Platform.OS === 'android' ? (
          <>
            <ContentRowAndroid blocks={statusRow} />
            <ContentRowAndroid blocks={dueRow} />
          </>
        ) : (
          <>
            <List.Item title={<ContentRow blocks={statusRow} />} />
            <List.Item title={<ContentRow blocks={dueRow} />} />
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
