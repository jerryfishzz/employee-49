import { Task } from 'src/utils/schema';

interface PriorityValue {
  value: string;
  weight: number;
}

export const PRIORITY: Record<Task['priority'], PriorityValue> = {
  high: {
    value: 'High',
    weight: 3,
  },
  normal: {
    value: 'Normal',
    weight: 2,
  },
  low: {
    value: 'Low',
    weight: 1,
  },
};
