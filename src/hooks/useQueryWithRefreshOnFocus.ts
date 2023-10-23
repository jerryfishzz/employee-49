import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef } from 'react';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';

export function useQueryWithRefreshOnFocus<T>(query: () => Promise<T[]>) {
  const firstTimeRef = useRef(true);

  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: query,
  });
  const { data, isError, error, refetch } = result;

  const [, dispatch] = useEmployee();

  useEffect(() => {
    let isMounted: boolean = true;
    if (isError) {
      if (data) {
        (error as AxiosError).status !== 404 &&
          runNoticeCombo(
            dispatch,
            getErrorText(error as AxiosError),
            'SHOW_ERROR_NOTICE',
            isMounted,
          );
      }
    }
    return () => {
      isMounted = false;
    };
  }, [data, dispatch, error, isError]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // setEnabled(true);
      refetch();
    }, [refetch]),
  );

  return result;
}
