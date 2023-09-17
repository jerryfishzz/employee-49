import { validateSource } from 'src/utils/helpers';
import { Task, TaskMap, tasksSchema } from './schema';

export function tasksToMap(tasks: Task[]): TaskMap {
  const validatedTasks = validateSource(tasksSchema, tasks);
  return new Map(validatedTasks.map((task) => [task.id, task]));
}
