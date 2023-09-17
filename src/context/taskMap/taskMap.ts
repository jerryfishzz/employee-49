import { Dispatch } from 'react';

import { createContext } from 'src/utils/context-utils';
import { Task, TaskMap } from './schema';

type Action = {
  type: 'Complete task' | 'Set to to-do';
  id: Task['id'];
};

const [useTaskMap, taskMapContext] = createContext<[TaskMap, Dispatch<Action>]>(
  '<TaskMap />',
  'TaskMap',
);

export function taskMapReducer(state: TaskMap, action: Action) {
  switch (action.type) {
    case 'Complete task':
    case 'Set to to-do': {
      const currentTask = state.has(action.id) ? state.get(action.id) : null;

      if (!currentTask) return state;

      const newState = new Map(state);
      newState.set(action.id, {
        ...currentTask,
        completed:
          action.type === 'Complete task' ? new Date().toISOString() : null,
        status: action.type === 'Complete task' ? 'done' : 'toDo',
      });

      return newState;
    }
    default:
      throw new Error('Unknown action type');
  }
}

export { useTaskMap, taskMapContext };
