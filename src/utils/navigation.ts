import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootTabParamList = {
  index: undefined;
  done: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  MaterialTopTabScreenProps<RootTabParamList, Screen>;
