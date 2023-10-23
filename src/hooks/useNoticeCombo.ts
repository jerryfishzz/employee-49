import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AxiosError } from 'axios';

import { getNotice, hideNotice, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';

export function useNoticeCombo(error: AxiosError, isNoticeShown: boolean) {
  const [, dispatch] = useEmployee();

  useEffect(() => {
    let isMounted: boolean = true;
    if (isNoticeShown) {
      const noticeId = uuidv4();
      error.status !== 404 &&
        getNotice(dispatch, getErrorText(error), 'SHOW_ERROR_NOTICE', noticeId);
      setTimeout(() => {
        isMounted !== false && hideNotice(dispatch, noticeId);
      }, 3000);
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, error, isNoticeShown]);
}
