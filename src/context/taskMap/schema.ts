import { z } from 'zod';

const taskSchema = z.object({
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
export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
export type TaskMap = z.infer<typeof taskMapSchema>;
