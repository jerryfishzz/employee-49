import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { updateDetail } from 'src/utils/api';
import { getErrorText } from 'src/utils/helpers';
import { Task } from 'src/utils/schema';

type UseCreatePostMutationParams = {
  runOnSuccess?: ((data: Task) => void) | (() => void);
  runOnError?: () => void;
};

export function useCreatePostMutation({
  runOnSuccess,
  runOnError,
}: UseCreatePostMutationParams = {}) {
  const [, dispatch] = useEmployee();

  return useMutation({
    mutationFn: updateDetail,
    onSuccess: (data, variables) => {
      runOnSuccess?.(data);

      runNoticeCombo(
        dispatch,
        `${variables.title.toUpperCase()}\n- Status modified`,
        'SHOW_SUCCESS_NOTICE',
      );
    },
    onError: (error) => {
      runOnError?.();
      (error as AxiosError).status !== 404 &&
        runNoticeCombo(
          dispatch,
          getErrorText(error as AxiosError),
          'SHOW_ERROR_NOTICE',
        );
    },
  });
}
