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
import { hideNotice, showNotice, useEmployee } from 'src/context/employee';

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

  const [, dispatch] = useEmployee();

  const [isEitherFetching, setIsEitherFetching] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setState(data as T);
      hideNotice(dispatch);
    }
  }, [data, dispatch, setState]);

  useEffect(() => {
    isError && showNotice(dispatch, (error as Error).message);
  }, [dispatch, error, isError]);

  useEffect(() => {
    setIsEitherFetching(isFetching);
  }, [isFetching]);

  useFocusEffect(
    useCallback(() => {
      let isMounted: boolean = true;

      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      setIsEitherFetching(true);

      query()
        .then((result) => {
          if (isMounted) {
            setState(result);
            hideNotice(dispatch);
            setIsEitherFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (isMounted) {
            showNotice(dispatch, (err as Error).message);
            setIsEitherFetching(false);
          }

          // Don't throw error here since it is the most outside layer
        });

      return () => {
        isMounted = false;
      };
    }, [dispatch, query, setState]),
  );

  return [result, isEitherFetching] as const;
}
