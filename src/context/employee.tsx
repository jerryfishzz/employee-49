import { Dispatch, ReactNode, useReducer } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { createContext } from 'src/utils/context-utils';

type Action =
  | { type: 'HIDE_NOTICE'; id: string }
  | {
      type: 'SHOW_ERROR_NOTICE';
      notice: string;
      id: string;
    }
  | {
      type: 'SHOW_SUCCESS_NOTICE';
      notice: string;
      id: string;
    };

type EmployeeState = {
  notification: {
    visible: string;
    notice: string;
    type?: 'error' | 'success';
  };
};

type EmployeeProviderProps = {
  initialState: EmployeeState;
  children: ReactNode;
};

const [useEmployee, employeeContext] = createContext<
  [EmployeeState, Dispatch<Action>]
>('<Employee />', 'Employee');

export function EmployeeProvider({
  initialState,
  children,
}: EmployeeProviderProps) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  return (
    <employeeContext.Provider value={[state, dispatch]}>
      {children}
    </employeeContext.Provider>
  );
}

function employeeReducer(state: EmployeeState, action: Action): EmployeeState {
  switch (action.type) {
    case 'HIDE_NOTICE':
      return {
        ...state,
        notification: {
          ...state.notification,
          visible:
            action.id === state.notification.visible
              ? ''
              : state.notification.visible,
        },
      };
    case 'SHOW_ERROR_NOTICE':
      return {
        ...state,
        notification: {
          ...state.notification,
          visible: action.id,
          notice: action.notice,
          type: 'error',
        },
      };
    case 'SHOW_SUCCESS_NOTICE':
      return {
        ...state,
        notification: {
          ...state.notification,
          visible: action.id,
          notice: action.notice,
          type: 'success',
        },
      };
    default:
      throw new Error('Unknown action type');
  }
}

export function hideNotice(dispatch: Dispatch<Action>, id: string) {
  dispatch({ type: 'HIDE_NOTICE', id });
}

function showErrorNotice(
  dispatch: Dispatch<Action>,
  notice: string,
  id: string,
) {
  dispatch({
    type: 'SHOW_ERROR_NOTICE',
    notice,
    id,
  });
}

function showSuccessNotice(
  dispatch: Dispatch<Action>,
  notice: string,
  id: string,
) {
  dispatch({
    type: 'SHOW_SUCCESS_NOTICE',
    notice,
    id,
  });
}

export function runNoticeCombo(
  dispatch: Dispatch<Action>,
  notice: string,
  type: 'SHOW_ERROR_NOTICE' | 'SHOW_SUCCESS_NOTICE',
) {
  const noticeId = uuidv4();
  type === 'SHOW_ERROR_NOTICE'
    ? showErrorNotice(dispatch, notice, noticeId)
    : showSuccessNotice(dispatch, notice, noticeId);
  setTimeout(() => {
    hideNotice(dispatch, noticeId);
  }, 3000);
}

export { useEmployee, employeeContext };
