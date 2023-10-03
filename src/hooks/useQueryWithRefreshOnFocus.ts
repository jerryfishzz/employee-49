import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';

export function useQueryWithRefreshOnFocus<T>(
  query: () => Promise<T[]>,
  initialEnabled: boolean = true,
) {
  const firstTimeRef = useRef(true);

  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: query,
    enabled, // Using manual query will lose the focus ability on web
  });
  const { data, isError, error, isFetching, isSuccess } = result;

  const [, dispatch] = useEmployee();

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setEnabled(false);
    }
  }, [dispatch, isFetching, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (data) {
        (error as AxiosError).status !== 404 &&
          runNoticeCombo(
            dispatch,
            getErrorText(error as AxiosError),
            'SHOW_ERROR_NOTICE',
          );
      }

      setEnabled(false);
    }
  }, [data, dispatch, error, isError]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      setEnabled(true);
    }, []),
  );

  return [result, setEnabled] as const;
}
