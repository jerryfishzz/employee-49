import { UseQueryResult } from '@tanstack/react-query';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Block } from 'src/components/ContentRow';
import { Task } from 'src/utils/schema';

export interface DetailProps {
  task: Task;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  fetchingStatus: UseQueryResult['fetchStatus'];
}

export interface DetailRowData {
  blocks: Block[];
  right?: {
    android: Block;
    others: ReactNode;
  };
  isBorderBottomHidden?: boolean;
}
