import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
import { Info } from 'src/screens/Info';
import { Loading } from 'src/screens/Loading';
import { getDetail } from 'src/utils/api';
import { getErrorText } from 'src/utils/helpers';

export default function Route() {
  const { id } = useTaskLocalSearchParams();

  const [enabled, setEnabled] = useState<boolean>(true);
  const {
    isLoading,
    isFetching,
    data: task,
    isError,
    error,
    fetchStatus,
  } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
    enabled,
  });

  const [, dispatch] = useEmployee();

  // Show error notice only when task already exists
  useEffect(() => {
    let isMounted: boolean = true;
    if (!isLoading && !isFetching && isError && task) {
      (error as AxiosError).status !== 404 &&
        runNoticeCombo(
          dispatch,
          getErrorText(error as AxiosError),
          'SHOW_ERROR_NOTICE',
          isMounted,
        );
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, error, isError, isFetching, isLoading, task]);

  // Disable the query when data received
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setEnabled(false);
    }
  }, [isFetching, isLoading]);

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
        <Detail task={task} setEnabled={setEnabled} fetchStatus={fetchStatus} />
      ) : (
        <Info
          type="error"
          msg={(error as AxiosError).message}
          secondMsg={(error as AxiosError).response?.statusText}
          setEnabled={setEnabled}
        />
      )}
    </>
  );
}
