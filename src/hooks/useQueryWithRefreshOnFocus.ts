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
import { useNotification } from './useNotification';

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
  const { data, isError, error, isFetching } = result;

  const [errorResult, setErrorResult] = useState<ErrorResultState>({
    isError: false,
    error: null,
  });

  const [isEitherFetching, setIsEitherFetching] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;
    if (data && isMounted) {
      setState(data as T);
      setErrorResult({ isError: false, error: null });
    }
    return () => {
      isMounted = false;
    };
  }, [data, setState]);

  useEffect(() => {
    let isMounted: boolean = true;
    isError && isMounted && setErrorResult({ isError, error: error as Error });
    return () => {
      isMounted = false;
    };
  }, [error, isError]);

  useEffect(() => {
    let isMounted: boolean = true;
    isMounted && setIsEitherFetching(isFetching);
    return () => {
      isMounted = false;
    };
  }, [isFetching]);

  useFocusEffect(
    useCallback(() => {
      let isMounted: boolean = true;

      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      isMounted && setIsEitherFetching(true);

      query()
        .then((result) => {
          if (isMounted) {
            setState(result);
            setErrorResult({ isError: false, error: null });
            setIsEitherFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (isMounted) {
            setErrorResult({ isError: true, error: err as Error });
            setIsEitherFetching(false);
          }

          // Don't throw error here since it is the most outside layer
        });

      return () => {
        isMounted = false;
      };
    }, [query, setState]),
  );

  useNotification({ handler: errorResult.isError, content: errorResult.error });

  return [result, isEitherFetching] as const;
}
