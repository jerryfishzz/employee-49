import { StyleSheet } from 'react-native';

import { TaskList } from 'src/components/TaskList';
import { View } from 'src/components/Themed';
import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';
import { Task } from 'src/utils/schema';

type ListProps = {
  data: Task[];
  isPressDisabled: boolean;
} & RootTabScreenProps<keyof RootTabParamList>;

export function List({ data, isPressDisabled, route }: ListProps) {
  return (
    <View style={styles.container}>
      <TaskList
        isPressDisabled={isPressDisabled}
        data={data}
        routeName={route.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
