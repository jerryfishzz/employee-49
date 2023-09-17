import { Task, TaskMap } from './schema';

export function tasksToMap(tasks: Task[]): TaskMap {
  return new Map(tasks.map((task) => [task.id, task]));
}
