import { Dispatch } from 'react';

import { createContext } from 'src/utils/context-utils';
import { Task, TaskMap } from './schema';
import { tasksToMap } from './service';

type Action =
  | {
      type: 'completeTask' | 'setToTodo';
      id: Task['id'];
    }
  | {
      type: 'getTaskMap';
      tasks: Task[];
    };

const [useTaskMap, taskMapContext] = createContext<[TaskMap, Dispatch<Action>]>(
  '<TaskMapProvider />',
  'TaskMapProvider',
);

export function taskMapReducer(state: TaskMap, action: Action) {
  switch (action.type) {
    case 'completeTask':
    case 'setToTodo': {
      const currentTask = state.has(action.id) ? state.get(action.id) : null;

      if (!currentTask) return state;

      const newState = new Map(state);
      newState.set(action.id, {
        ...currentTask,
        completed:
          action.type === 'completeTask' ? new Date().toISOString() : null,
        status: action.type === 'completeTask' ? 'done' : 'toDo',
      });

      return newState;
    }
    case 'getTaskMap': {
      return tasksToMap(action.tasks);
    }
    default:
      throw new Error('Unknown action type');
  }
}

export { useTaskMap, taskMapContext };
