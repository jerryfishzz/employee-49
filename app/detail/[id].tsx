import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';

import { hideNotice, showNotice, useEmployee } from 'src/context/employee';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
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
  } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
  });

  const [
    {
      notification: { visible },
    },
    dispatch,
  ] = useEmployee();

  // Show notice only when task already exists
  useEffect(() => {
    !isLoading &&
      !isFetching &&
      isError &&
      task &&
      showNotice(dispatch, (error as Error).message);
  }, [dispatch, error, isError, isFetching, isLoading, task]);

  // Hide previous notice if no errors from query
  useEffect(() => {
    !isLoading && !isFetching && !isError && visible && hideNotice(dispatch);
  }, [dispatch, isError, isFetching, isLoading, visible]);

  // Show notice and redirect
  if (!isLoading && !isFetching) {
    if (isError && !task) {
      showNotice(dispatch, (error as Error).message);

      return <Redirect href="/404" />;
    }
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
