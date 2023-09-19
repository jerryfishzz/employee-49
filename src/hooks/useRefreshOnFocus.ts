import { useFocusEffect } from '@react-navigation/native';
import { Dispatch, SetStateAction, useCallback, useRef } from 'react';

export function useRefreshOnFocus<T>(
  refetch: () => Promise<T>,
  setState: Dispatch<SetStateAction<T>>,
) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch()
        .then((result) => {
          setState(result);
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }, [refetch, setState]),
  );
}
