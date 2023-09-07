import { Task } from 'src/data/task.schema';
import { paySauceColor } from '../constants/Colors';

interface PriorityValue {
  value: string;
  weight: number;
  color: string;
}

export const PRIORITY: Record<Task['priority'], PriorityValue> = {
  high: {
    value: 'High',
    weight: 3,
    color: paySauceColor.hotChilli,
  },
  normal: {
    value: 'Normal',
    weight: 2,
    color: paySauceColor.mint,
  },
  low: {
    value: 'Low',
    weight: 1,
    color: paySauceColor.blueberry,
  },
};
