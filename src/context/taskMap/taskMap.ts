import { Dispatch } from 'react';
import { z } from 'zod';

import { createContext } from 'src/utils/context-utils';

export const taskSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
  }),
  title: z.string({
    required_error: 'Title is required',
  }),
  status: z.enum(['toDo', 'done']),
  due: z.string({
    required_error: 'due is required',
  }),
  completed: z.string().nullable(),
  priority: z.enum(['high', 'normal', 'low']),
  description: z.string({
    required_error: 'Description is required',
  }),
});
const taskMapSchema = z.map(z.string(), taskSchema);

export type Task = z.infer<typeof taskSchema>;
export type TaskMap = z.infer<typeof taskMapSchema>;

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
