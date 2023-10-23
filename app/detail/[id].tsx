import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Redirect, Stack } from 'expo-router';

import { useNoticeCombo } from 'src/hooks/useNoticeCombo';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
import { Info } from 'src/screens/Info';
import { Loading } from 'src/screens/Loading';
import { getDetail } from 'src/utils/api';

export default function Route() {
  const { id } = useTaskLocalSearchParams();

  const {
    isLoading,
    isFetching,
    data: task,
    isError,
    error,
    fetchStatus,
    refetch,
  } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
  });

  // Show error notice only when task already exists
  useNoticeCombo(
    error as AxiosError,
    !!(!isLoading && !isFetching && isError && task),
  );

  // Redirect when id does not exists
  if (
    !isLoading &&
    !isFetching &&
    isError &&
    (error as AxiosError).response?.status === 404
  ) {
    return <Redirect href="/404" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: fetchStatus === 'fetching' ? 'LOADING...' : 'DETAIL',
        }}
      />
      {isLoading ? (
        <Loading />
      ) : task ? (
        <Detail task={task} refetch={refetch} fetchStatus={fetchStatus} />
      ) : (
        <Info
          type="error"
          msg={(error as AxiosError).message}
          secondMsg={(error as AxiosError).response?.statusText}
          refetch={refetch}
        />
      )}
    </>
  );
}
