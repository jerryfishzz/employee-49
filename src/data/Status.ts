import { Task } from '../context/taskMap';

export const STATUS: Record<Task['status'], string> = {
  toDo: 'To-Do',
  done: 'Done',
};
