import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { getTasks } from 'src/utils/api';

export function useQueryWithRefreshOnFocus<T>(
  query: () => Promise<T>,
  setState: Dispatch<SetStateAction<T>>,
) {
  const firstTimeRef = useRef(true);
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  useEffect(() => {
    result.data && setState(result.data as T);
  }, [result.data, setState]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      query()
        .then((result) => {
          setState(result);
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }, [query, setState]),
  );

  return result;
}
