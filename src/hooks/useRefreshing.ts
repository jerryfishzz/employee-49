import { UseQueryResult } from '@tanstack/react-query';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export function useRefreshing(
  setEnabled: Dispatch<SetStateAction<boolean>>,
  fetchingStatus: UseQueryResult['fetchStatus'],
) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setEnabled(true);
  }, [setEnabled]);

  useEffect(() => {
    fetchingStatus === 'idle' && setRefreshing(false);
  }, [fetchingStatus]);

  return [refreshing, onRefresh] as const;
}
