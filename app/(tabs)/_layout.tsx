import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { memo, useMemo } from 'react';

import { paySauceColor } from 'src/data/Colors';
import { STATUS } from 'src/data/Status';
import { List } from 'src/screens/List';
import { RootTabParamList } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';
import { useQueryWithRefreshOnFocus } from 'src/hooks/useQueryWithRefreshOnFocus';
import { Loading } from 'src/screens/Loading/Loading';
import { Task } from 'src/utils/schema';
import { ErrorScreen } from 'src/screens/ErrorScreen';

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
        {(props) =>
          isLoading ? (
            <MemoizedLoading />
          ) : toDo ? (
            <MemoizedList isPressDisabled={isFetching} data={toDo} {...props} />
          ) : (
            <MemoizedErrorScreen
              msg={error ? (error as Error).message : ''}
              setState={setEnabled}
            />
          )
        }
      </Tabs.Screen>
      <Tabs.Screen
        name="done"
        options={createOptions(STATUS.done, done ? done.length : '--')}
      >
        {(props) =>
          isLoading ? (
            <MemoizedLoading />
          ) : done ? (
            <MemoizedList isPressDisabled={isFetching} data={done} {...props} />
          ) : (
            <MemoizedErrorScreen
              msg={error ? (error as Error).message : ''}
              setState={setEnabled}
            />
          )
        }
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
