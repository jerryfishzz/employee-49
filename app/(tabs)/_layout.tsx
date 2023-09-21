import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { memo, useState } from 'react';

import { paySauceColor } from 'src/data/Colors';
import { STATUS } from 'src/data/Status';
import { List } from 'src/screens/List';
import { RootTabParamList } from 'src/navigation/types';
import { getTasks } from 'src/utils/api';
import { Task } from 'src/context/taskMap';
import { useQueryWithRefreshOnFocus } from 'src/hooks/useQueryWithRefreshOnFocus';
import { Loading } from 'src/screens/Loading/Loading';

const Tabs = createMaterialTopTabNavigator<RootTabParamList>();

const { white, hotChilli } = paySauceColor;

const MemoizedList = memo(List);
const MemoizedLoading = memo(Loading);

export default function TabLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading } = useQueryWithRefreshOnFocus(getTasks, setTasks);

  const toDo: Task[] = [];
  const done: Task[] = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks) {
      tasks[i].status === 'toDo' && toDo.push(tasks[i]);
      tasks[i].status === 'done' && done.push(tasks[i]);
    }
  }

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
        options={createOptions(STATUS.toDo, isLoading ? '--' : toDo.length)}
      >
        {(props) =>
          isLoading ? (
            <MemoizedLoading />
          ) : (
            <MemoizedList data={toDo} {...props} />
          )
        }
      </Tabs.Screen>
      <Tabs.Screen
        name="done"
        options={createOptions(STATUS.done, isLoading ? '--' : done.length)}
      >
        {(props) =>
          isLoading ? (
            <MemoizedLoading />
          ) : (
            <MemoizedList data={done} {...props} />
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
