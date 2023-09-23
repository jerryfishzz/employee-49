import { Dispatch, ReactNode, useReducer } from 'react';
import { createContext } from 'src/utils/context-utils';

type Action = { type: 'HIDE_NOTICE' } | { type: 'SHOW_NOTICE'; notice: string };

type EmployeeState = {
  notification: {
    visible: boolean;
    notice: string;
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
          visible: false,
        },
      };
    case 'SHOW_NOTICE':
      return {
        ...state,
        notification: {
          ...state.notification,
          visible: true,
          notice: action.notice,
        },
      };
    default:
      throw new Error('Unknown action type');
  }
}

export function hideNotice(dispatch: Dispatch<Action>) {
  dispatch({ type: 'HIDE_NOTICE' });
}

export function showNotice(dispatch: Dispatch<Action>, notice: string) {
  dispatch({ type: 'SHOW_NOTICE', notice });
}

export { useEmployee, employeeContext };
