import { RootTabParamList } from 'src/navigation/types';

export const rootTabParamList: RootTabParamList = {
  index: {
    menuItems: ['Priority', 'Due Date', 'Alphabetical'],
    defaultItem: 'Priority',
  },
  done: {
    menuItems: ['Priority', 'Due Date', 'Alphabetical', 'Completed'],
    defaultItem: 'Completed',
  },
};
