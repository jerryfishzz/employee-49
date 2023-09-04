import { StyleSheet } from 'react-native';

import { TaskList } from 'src/components/TaskList';
import { View } from 'src/components/Themed';
import { taskMap } from 'src/data/task';

export function ToDo() {
  return (
    <View style={styles.container}>
      <TaskList data={[...taskMap.values()]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
