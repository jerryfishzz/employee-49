import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';

export function useNoticeCombo(error: AxiosError, isNoticeShown: boolean) {
  const [, dispatch] = useEmployee();

  useEffect(() => {
    let isMounted: boolean = true;
    if (isNoticeShown) {
      error.status !== 404 &&
        runNoticeCombo(
          dispatch,
          getErrorText(error),
          'SHOW_ERROR_NOTICE',
          isMounted,
        );
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, error, isNoticeShown]);
}
