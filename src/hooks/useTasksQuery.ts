import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { getTasks } from 'src/utils/api';

export function useTasksQuery<T>(setState: Dispatch<SetStateAction<T>>) {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  useEffect(() => {
    query.data && setState(query.data as T);
  }, [query.data, setState]);

  return query;
}
