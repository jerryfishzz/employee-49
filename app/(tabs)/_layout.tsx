import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { memo, useMemo } from 'react';
import { AxiosError } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import { RouteProp } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { paySauceColor } from 'src/data/Colors';
import { STATUS } from 'src/data/Status';
import { List } from 'src/screens/List';
import { RootTabParamList } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';
import { useQueryWithRefreshOnFocus } from 'src/hooks/useQueryWithRefreshOnFocus';
import { Loading } from 'src/screens/Loading/Loading';
import { Task } from 'src/utils/schema';
import { Info } from 'src/screens/Info';

const Tabs = createMaterialTopTabNavigator<RootTabParamList>();

const { white, hotChilli } = paySauceColor;

const MemoizedList = memo(List);
const MemoizedLoading = memo(Loading);
const MemoizedInfo = memo(Info);

export default function TabLayout() {
  const { isPending, error, data, fetchStatus, refetch } =
    useQueryWithRefreshOnFocus(getTasks);

  const [toDo, done] = useMemo(() => separateTasks(data), [data]);

  return (
    <>
      <Stack.Screen
        options={{
          title: fetchStatus === 'fetching' ? 'LOADING...' : 'TASKS',
        }}
      />
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
            isPending,
            data: data as Task[],
            tasks: toDo,
            error: error as Error | null,
            fetchStatus,
            primaryMsg: "It looks like you're all caught up.",
            secondaryMsg: 'There are no tasks to do!',
            refetch,
          })}
        </Tabs.Screen>
        <Tabs.Screen
          name="done"
          options={createOptions(STATUS.done, done ? done.length : '--')}
        >
          {setChildrenByConditions({
            isPending,
            data: data as Task[],
            tasks: done,
            error: error as Error | null,
            fetchStatus,
            primaryMsg: 'Completed tasks will show here',
            refetch,
          })}
        </Tabs.Screen>
      </Tabs.Navigator>
    </>
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
      minWidth: 40, // Also need to adapt the above variant size to show enough width when counts are 2-digit
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
  isPending: boolean;
  data: Task[];
  tasks: Task[] | undefined;
  error?: Error | null;
  fetchStatus: UseQueryResult['fetchStatus'];
  primaryMsg?: string;
  secondaryMsg?: string;
  refetch: UseQueryResult['refetch'];
};
type GetChildrenParam = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};
function setChildrenByConditions({
  isPending,
  data,
  tasks,
  error,
  fetchStatus,
  primaryMsg,
  secondaryMsg,
  refetch,
}: SetChildrenByConditionsParam) {
  // eslint-disable-next-line react/display-name
  return (props: GetChildrenParam) =>
    isPending ? (
      <MemoizedLoading />
    ) : tasks ? (
      tasks.length > 0 ? (
        <MemoizedList
          data={data}
          tasks={tasks}
          fetchStatus={fetchStatus}
          routeName={props.route.name}
          refetch={refetch}
        />
      ) : (
        <MemoizedInfo
          type="hint"
          msg={primaryMsg}
          secondMsg={secondaryMsg}
          refetch={refetch}
        />
      )
    ) : (
      <MemoizedInfo
        type="error"
        msg={error ? (error as AxiosError).message : 'Unknown error'}
        secondMsg={error ? (error as AxiosError).response?.statusText : ''}
        refetch={refetch}
      />
    );
}
