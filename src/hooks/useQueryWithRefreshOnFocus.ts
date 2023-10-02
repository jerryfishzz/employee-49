import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { hideNotice, showErrorNotice, useEmployee } from 'src/context/employee';
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
      hideNotice(dispatch);
      setEnabled(false);
    }
  }, [dispatch, isFetching, isSuccess]);

  useEffect(() => {
    if (isError) {
      data &&
        showErrorNotice(dispatch, getErrorText(error as AxiosError), uuidv4());
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
