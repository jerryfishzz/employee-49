import { StyleSheet } from 'react-native';

import { TaskList } from 'src/components/TaskList';
import { View } from 'src/components/Themed';
import { taskMap } from 'src/data/task';
import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';

export function List({ route }: RootTabScreenProps<keyof RootTabParamList>) {
  return (
    <View style={styles.container}>
      <TaskList data={[...taskMap.values()]} routeName={route.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
