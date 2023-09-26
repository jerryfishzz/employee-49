import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getTasks } from 'src/utils/api';

type ErrorResultState = {
  isError: boolean;
  error: Error | null;
};

export function useQueryWithRefreshOnFocus<T>(
  query: () => Promise<T>,
  setState: Dispatch<SetStateAction<T>>,
) {
  const firstTimeRef = useRef(true);

  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  const { data, isError, error } = result;

  const [errorResult, setErrorResult] = useState<ErrorResultState>({
    isError: false,
    error: null,
  });

  useEffect(() => {
    if (data) {
      setState(data as T);
      setErrorResult({ isError: false, error: null });
    }
  }, [data, setState]);

  useEffect(() => {
    isError && setErrorResult({ isError, error: error as Error });
  }, [error, isError]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      query()
        .then((result) => {
          setState(result);
          setErrorResult({ isError: false, error: null });
        })
        .catch((err) => {
          console.error(err);
          setErrorResult({ isError: true, error: err as Error });
          throw err;
        });
    }, [query, setState]),
  );

  return [result, errorResult] as const;
}
