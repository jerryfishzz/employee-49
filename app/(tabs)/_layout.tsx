import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { memo } from 'react';

import { paySauceColor } from 'src/data/Colors';
import { STATUS } from 'src/data/Status';
import { List } from 'src/screens/List';
import { RootTabParamList } from 'src/navigation/types';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from 'src/utils/api';
import { View } from 'src/components/Themed';

import { Task } from 'src/context/taskMap';

const Tabs = createMaterialTopTabNavigator<RootTabParamList>();

const { white, hotChilli } = paySauceColor;

const MemoizedList = memo(List);

export default function TabLayout() {
  const { isLoading, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (isLoading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );

  const toDo: Task[] = [];
  const done: Task[] = [];

  for (let i = 0; i < (data ? data : []).length; i++) {
    if (data) {
      data[i].status === 'toDo' && toDo.push(data[i]);
      data[i].status === 'done' && done.push(data[i]);
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
        {(props) => <MemoizedList data={toDo} {...props} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="done"
        options={createOptions(STATUS.done, isLoading ? '--' : done.length)}
      >
        {(props) => <MemoizedList data={done} {...props} />}
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
