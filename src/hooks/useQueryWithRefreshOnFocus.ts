import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { hideNotice, showErrorNotice, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';

type EnabledState = {
  enabled: boolean;
  isNoticeHidden: boolean;
};

export function useQueryWithRefreshOnFocus<T>(
  query: () => Promise<T[]>,
  componentSeg: '(tabs)' | 'detail',
  initialEnabled: boolean = true,
) {
  const firstTimeRef = useRef(true);

  const [{ enabled, isNoticeHidden }, setEnabled] = useState<EnabledState>({
    enabled: initialEnabled,
    isNoticeHidden: true,
  });
  const result = useQuery({
    queryKey: ['tasks'],
    queryFn: query,
    enabled, // Using manual query will lose the focus ability on web
  });
  const { data, isError, error, isFetching, isSuccess } = result;

  const [
    {
      notification: { focus },
    },
    dispatch,
  ] = useEmployee();
  console.log(focus);
  console.log(componentSeg);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      focus === componentSeg && isNoticeHidden && hideNotice(dispatch);
      setEnabled((cur) => ({
        ...cur,
        enabled: false,
      }));
    }
  }, [componentSeg, dispatch, focus, isFetching, isNoticeHidden, isSuccess]);

  useEffect(() => {
    if (isError) {
      data && showErrorNotice(dispatch, getErrorText(error as AxiosError));
      setEnabled((cur) => ({
        ...cur,
        enabled: false,
      }));
    }
  }, [data, dispatch, error, isError]);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      setEnabled({
        isNoticeHidden: true,
        enabled: true,
      });
    }, []),
  );

  return [result, setEnabled] as const;
}
