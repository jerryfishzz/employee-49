import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { useTaskLocalSearchParams } from 'src/hooks/useTaskLocalSearchParams';
import { Detail } from 'src/screens/Detail';
import { ErrorScreen } from 'src/screens/ErrorScreen';
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
  } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
    enabled,
  });

  const [, dispatch] = useEmployee();

  // Show error notice only when task already exists
  useEffect(() => {
    if (!isLoading && !isFetching && isError && task) {
      runNoticeCombo(
        dispatch,
        getErrorText(error as AxiosError),
        'SHOW_ERROR_NOTICE',
      );
    }
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
      {isLoading ? (
        <Loading />
      ) : task ? (
        <Detail task={task} />
      ) : (
        <ErrorScreen
          msg={(error as AxiosError).message}
          zodMsg={(error as AxiosError).response?.statusText}
          setEnabled={setEnabled}
        />
      )}
    </>
  );
}
