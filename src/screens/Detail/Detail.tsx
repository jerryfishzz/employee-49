import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { List } from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Detail Screen</Text>
        <Text>ID: {id}</Text>
        {Platform.OS === 'android' ? (
          <>
            <ContentRowAndroid blocks={statusRow} />
          </>
        ) : (
          <List.Item title={<ContentRow blocks={statusRow} />} />
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
