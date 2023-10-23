import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { Block } from 'src/components/ContentRow';
import { Task } from 'src/utils/schema';

export interface DetailProps {
  task: Task;
  fetchStatus: UseQueryResult['fetchStatus'];
  refetch: UseQueryResult['refetch'];
}

export interface DetailRowData {
  blocks: Block[];
  right?: {
    android: Block;
    others: ReactNode;
  };
  isBorderBottomHidden?: boolean;
  getBlocks?: () => Block[];
}
