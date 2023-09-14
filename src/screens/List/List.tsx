import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';

import { TaskList } from 'src/components/TaskList';
import { View } from 'src/components/Themed';
import { taskMap } from 'src/data/task';
import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';
import { useRefreshOnFocus } from './useRefreshOnFocus';

export function List({ route }: RootTabScreenProps<keyof RootTabParamList>) {
  useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  // Re-fetch on screen focus
  // since this screen won't get re-rendered on mobile when switching back.
  // That causes react query cannot be triggered.
  useRefreshOnFocus(getTasks);

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
