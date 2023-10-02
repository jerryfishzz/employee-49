import { Dispatch, ReactNode, useReducer } from 'react';

import { createContext } from 'src/utils/context-utils';

type Action =
  | { type: 'HIDE_NOTICE' }
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
          visible: '',
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

export function hideNotice(dispatch: Dispatch<Action>) {
  dispatch({ type: 'HIDE_NOTICE' });
}

export function showErrorNotice(
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

export function showSuccessNotice(
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

export { useEmployee, employeeContext };
