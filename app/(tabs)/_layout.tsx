import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Dispatch, SetStateAction, memo, useMemo } from 'react';
import { AxiosError } from 'axios';

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
import { UseQueryResult } from '@tanstack/react-query';

const Tabs = createMaterialTopTabNavigator<RootTabParamList>();

const { white, hotChilli } = paySauceColor;

const MemoizedList = memo(List);
const MemoizedLoading = memo(Loading);
const MemoizedErrorScreen = memo(ErrorScreen);

export default function TabLayout() {
  const [{ isLoading, error, data: tasks, fetchStatus }, setEnabled] =
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
          error: error as Error | null,
          setEnabled,
          fetchStatus,
        })}
      </Tabs.Screen>
      <Tabs.Screen
        name="done"
        options={createOptions(STATUS.done, done ? done.length : '--')}
      >
        {setChildrenByConditions({
          isLoading,
          tasks: done,
          error: error as Error | null,
          setEnabled,
          fetchStatus,
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
  error: Error | null;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  fetchStatus: UseQueryResult['fetchStatus'];
};
type GetChildrenParam = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};
function setChildrenByConditions({
  isLoading,
  tasks,
  error,
  setEnabled,
  fetchStatus,
}: SetChildrenByConditionsParam) {
  // eslint-disable-next-line react/display-name
  return (props: GetChildrenParam) =>
    isLoading ? (
      <MemoizedLoading />
    ) : tasks ? (
      <MemoizedList
        data={tasks}
        fetchStatus={fetchStatus}
        setEnabled={setEnabled}
        {...props}
      />
    ) : (
      <MemoizedErrorScreen
        msg={error ? (error as AxiosError).message : 'Unknown error'}
        zodMsg={error ? (error as AxiosError).response?.statusText : ''}
        setEnabled={setEnabled}
      />
    );
}
