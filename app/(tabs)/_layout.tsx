import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Dispatch, SetStateAction, memo, useMemo } from 'react';

import { paySauceColor } from 'src/data/Colors';
import { STATUS } from 'src/data/Status';
import { List } from 'src/screens/List';
import { RootTabParamList } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';
import { useQueryWithRefreshOnFocus } from 'src/hooks/useQueryWithRefreshOnFocus';
import { Loading } from 'src/screens/Loading/Loading';
import { Task } from 'src/utils/schema';
import { ErrorScreen } from 'src/screens/ErrorScreen';
import { RouteProp } from '@react-navigation/native';

const Tabs = createMaterialTopTabNavigator<RootTabParamList>();

const { white, hotChilli } = paySauceColor;

const MemoizedList = memo(List);
const MemoizedLoading = memo(Loading);
const MemoizedErrorScreen = memo(ErrorScreen);

export default function TabLayout() {
  const [{ isLoading, isFetching, error, data: tasks }, setEnabled] =
    useQueryWithRefreshOnFocus(getTasks);

  const [toDo, done] = useMemo(() => separateTasks(tasks), [tasks]);

  return (
    <Tabs.Navigator
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: white,
        tabBarStyle: {
          backgroundColor: hotChilli,
          // borderBottomWidth: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: white,
          marginBottom: -1, // Make the border riding between elements
        },
        swipeEnabled: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={createOptions(STATUS.toDo, toDo ? toDo.length : '--')}
      >
        {setChildrenByConditions({
          isLoading,
          tasks: toDo,
          isFetching,
          error: error as Error | null,
          setEnabled,
        })}
      </Tabs.Screen>
      <Tabs.Screen
        name="done"
        options={createOptions(STATUS.done, done ? done.length : '--')}
      >
        {setChildrenByConditions({
          isLoading,
          tasks: done,
          isFetching,
          error: error as Error | null,
          setEnabled,
        })}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

function createOptions(title: string, counts: number | string) {
  const options: MaterialTopTabNavigationOptions = {
    title,
    tabBarIcon: ({ color }) => (
      <Text
        variant="headlineLarge"
        style={{
          color,
          textAlign: 'center',
          fontFamily: 'MontserratExtraLight',
        }}
      >
        {counts}
      </Text>
    ),
    tabBarIconStyle: {
      minHeight: Platform.OS === 'ios' ? 32 : 36, // Equal to the above Text variant font size in iOS while a little bigger in Android
      minWidth: 32, // Also need to adapt the above variant size to show enough width when counts are 2-digit
    },
    tabBarLabelStyle: {
      fontFamily: 'MontserratBold',
    },
  };

  return options;
}

function separateTasks(tasks: Task[] | undefined) {
  if (!tasks) return [undefined, undefined] as const;

  const toDo: Task[] = [];
  const done: Task[] = [];

  for (let i = 0; i < tasks.length; i++) {
    {
      tasks[i].status === 'toDo' && toDo.push(tasks[i]);
      tasks[i].status === 'done' && done.push(tasks[i]);
    }
  }

  return [toDo, done] as const;
}

type SetChildrenByConditionsParam = {
  isLoading: boolean;
  tasks: Task[] | undefined;
  isFetching: boolean;
  error: Error | null;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};
type GetChildrenParam = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};
function setChildrenByConditions({
  isLoading,
  tasks,
  isFetching,
  error,
  setEnabled,
}: SetChildrenByConditionsParam) {
  // eslint-disable-next-line react/display-name
  return (props: GetChildrenParam) =>
    isLoading ? (
      <MemoizedLoading />
    ) : tasks ? (
      <MemoizedList isPressDisabled={isFetching} data={tasks} {...props} />
    ) : (
      <MemoizedErrorScreen
        msg={error ? (error as Error).message : ''}
        setState={setEnabled}
      />
    );
}
