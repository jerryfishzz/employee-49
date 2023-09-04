import { paySauceColor } from './Colors';

export const PRIORITY = {
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
} as const;

export type Priority = keyof typeof PRIORITY;
