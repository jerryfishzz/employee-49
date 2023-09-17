import { Task } from '../context/task.schema';

export const STATUS: Record<Task['status'], string> = {
  toDo: 'To-Do',
  done: 'Done',
};
