import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { updateDetail } from 'src/utils/api';
import { getErrorText } from 'src/utils/helpers';
import { Task } from 'src/utils/schema';

export function useCreatePostMutation(
  setEnabled: Dispatch<SetStateAction<boolean>>,
  run?: (data: Task) => void,
) {
  const [, dispatch] = useEmployee();

  return useMutation({
    mutationFn: updateDetail,
    onSuccess: (data, variables) => {
      run?.(data);

      // Delay setEnabled a little bit to have a better visual effect on notice emerging
      setTimeout(() => {
        setEnabled(true);
      }, 500);

      runNoticeCombo(
        dispatch,
        `${variables.title.toUpperCase()}\n- Status modified`,
        'SHOW_SUCCESS_NOTICE',
      );
    },
    onError: (error) => {
      (error as AxiosError).status !== 404 &&
        runNoticeCombo(
          dispatch,
          getErrorText(error as AxiosError),
          'SHOW_ERROR_NOTICE',
        );
    },
  });
}
