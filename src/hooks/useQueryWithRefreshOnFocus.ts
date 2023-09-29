import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { hideNotice, showErrorNotice, useEmployee } from 'src/context/employee';

export function useQueryWithRefreshOnFocus<T>(query: () => Promise<T[]>) {
  const firstTimeRef = useRef(true);

  const [enabled, setEnabled] = useState<boolean>(true);
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: query,
    enabled, // Using manual query will lose the focus ability on web
  });
  const { data, isError, error, isFetching, isSuccess } = result;

  const [, dispatch] = useEmployee();

  useEffect(() => {
    if (isSuccess && !isFetching) {
      hideNotice(dispatch);
      setEnabled(false);
    }
  }, [dispatch, isFetching, isSuccess]);

  useEffect(() => {
    if (isError) {
      data && showErrorNotice(dispatch, (error as Error).message);
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
