import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootTabParam = {
  menuItems: string[];
  defaultItem: string;
};

export type RootTabParamList = {
  index: RootTabParam;
  done: RootTabParam;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  MaterialTopTabScreenProps<RootTabParamList, Screen>;

export type TaskSearchParams = {
  id: string;
};
