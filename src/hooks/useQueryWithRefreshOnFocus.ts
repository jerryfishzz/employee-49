import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useRef } from 'react';

import { useNoticeCombo } from './useNoticeCombo';

export function useQueryWithRefreshOnFocus<T>(query: () => Promise<T[]>) {
  const firstTimeRef = useRef(true);

  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: query,
  });
  const { data, isError, error, refetch } = result;

  // Show error notice only when tasks already exist
  useNoticeCombo(error as AxiosError, !!(isError && data));

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
