import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { hideNotice, showNotice, useEmployee } from 'src/context/employee';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
import { ErrorScreen } from 'src/screens/ErrorScreen';
import { Loading } from 'src/screens/Loading';
import { getDetail } from 'src/utils/api';

export default function Route() {
  const { id } = useTaskLocalSearchParams();

  const [enabled, setEnabled] = useState<boolean>(true);
  const {
    isLoading,
    isFetching,
    data: task,
    isError,
    error,
  } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
    enabled,
  });

  const [
    {
      notification: { visible },
    },
    dispatch,
  ] = useEmployee();

  // Show error notice only when task already exists
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

  // Disable the query when data received
  useEffect(() => {
    !isLoading && !isFetching && setEnabled(false);
  }, [isFetching, isLoading]);

  // Redirect when id does not exists
  if (!isLoading && !isFetching && !isError && !task) {
    return <Redirect href="/404" />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : task ? (
        <Detail task={task} />
      ) : (
        <ErrorScreen msg={(error as Error).message} setState={setEnabled} />
      )}
    </>
  );
}
