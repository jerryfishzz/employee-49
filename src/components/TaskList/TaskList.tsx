import { FlatList } from 'react-native';

import { TaskRow } from './TaskRow';
import { Item, TaskListProps } from './types';

export function TaskList<T extends Item>({ data }: TaskListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        // <Row style={{ flexDirection: 'row', alignItems: 'center' }}>
        //   <Row.Text
        //     variant="headlineMedium"
        //     testID={`row-${item.id}`}
        //     viewStyle={{ flex: 1 }}
        //   >
        //     {item.title}
        //   </Row.Text>
        //   <Row.Text variant="titleMedium">{item.id}</Row.Text>
        // </Row>
        <TaskRow item={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
