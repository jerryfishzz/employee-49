import { ReactNode } from 'react';
import { Block } from 'src/components/ContentRow';
import { Task } from 'src/data/task.schema';

export interface DetailProps {
  task: Task;
}

export interface DetailRowData {
  blocks: Block[];
  right?: {
    android: Block;
    others: ReactNode;
  };
  isBorderBottomHidden?: boolean;
}
