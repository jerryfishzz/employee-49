import { UseQueryResult } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export function useRefreshing(
  fetchingStatus: UseQueryResult['fetchStatus'],
  refetch: UseQueryResult['refetch'],
) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, [refetch]);

  useEffect(() => {
    fetchingStatus === 'idle' && setRefreshing(false);
  }, [fetchingStatus]);

  return [refreshing, onRefresh] as const;
}
