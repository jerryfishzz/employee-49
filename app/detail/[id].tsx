import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';

import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
import { Loading } from 'src/screens/Loading';
import { getDetail } from 'src/utils/api';

export default function Route() {
  const { id } = useTaskLocalSearchParams();

  const { isLoading, data: task } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
  });

  if (!isLoading && task === undefined) {
    return <Redirect href="/404" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: task?.title.toUpperCase(),
        }}
      />
      {isLoading ? <Loading /> : <Detail task={task} />}
    </>
  );
}
