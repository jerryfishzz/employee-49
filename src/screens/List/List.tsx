import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { UseQueryResult } from '@tanstack/react-query';

import { View } from 'src/components/Themed';
import { RootTabParamList } from 'src/navigation/types';
import { Task } from 'src/utils/schema';
import { useRefreshing } from 'src/hooks/useRefreshing';
import { ListRow } from './ListRow';
import SearchBar from 'src/components/SearchBar';
import SortBar from 'src/components/SortBar';
import { rootTabParamList } from 'src/data/rootTabParamList';

type ListProps = {
  data: Task[]; // Results from the server
  tasks: Task[]; // Results only for the list tab
  fetchStatus: UseQueryResult['fetchStatus'];
  routeName: keyof RootTabParamList;
  refetch: UseQueryResult['refetch'];
};

export function List({
  data,
  tasks,
  fetchStatus,
  routeName,
  refetch,
}: ListProps) {
  const [refreshing, onRefresh] = useRefreshing(fetchStatus, refetch);

  return (
    <View style={styles.container}>
      <SearchBar />
      <SortBar rootTabParam={rootTabParamList[routeName]} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={tasks}
        renderItem={({ item }) => (
          <ListRow
            item={item}
            routeName={routeName}
            data={data}
            refetch={refetch}
          />
        )}
        keyExtractor={(item) => item.id}
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
