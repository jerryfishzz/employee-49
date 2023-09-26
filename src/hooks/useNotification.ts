import { useEffect } from 'react';

import { hideNotice, showNotice, useEmployee } from 'src/context/employee';

type UseNotificationParams = {
  handler: boolean;
  content: (object & Error) | null;
};

export function useNotification({ handler, content }: UseNotificationParams) {
  const [, dispatch] = useEmployee();

  useEffect(() => {
    if (handler) {
      const notice = content?.message ?? 'Unknown error';
      showNotice(dispatch, notice);
    } else {
      hideNotice(dispatch);
    }
  }, [content?.message, dispatch, handler]);
}
