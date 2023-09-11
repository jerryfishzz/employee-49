import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'expo-router';
import { StyleSheet } from 'react-native';

import { TaskList } from 'src/components/TaskList';
import { View } from 'src/components/Themed';
import { taskMap } from 'src/data/task';
import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';

export function List({ route }: RootTabScreenProps<keyof RootTabParamList>) {
  // const path = usePathname();
  // console.log(`path: ${path}`);
  // console.log(`route: ${route.name}`);

  useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

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
