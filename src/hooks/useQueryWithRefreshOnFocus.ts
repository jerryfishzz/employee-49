import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getNotice, hideNotice, useEmployee } from 'src/context/employee';
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
    if (isError && data) {
      const noticeId = uuidv4();
      (error as AxiosError).status !== 404 &&
        getNotice(
          dispatch,
          getErrorText(error as AxiosError),
          'SHOW_ERROR_NOTICE',
          noticeId,
        );
      setTimeout(() => {
        isMounted !== false && hideNotice(dispatch, noticeId);
      }, 3000);
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

      refetch();
    }, [refetch]),
  );

  return result;
}
