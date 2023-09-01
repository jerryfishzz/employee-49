import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';

import { Text } from 'src/components/Themed';
import { taskMap } from 'src/data/task';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { Done } from 'src/screens/Done';
import { ToDo } from 'src/screens/ToDo';

const Tabs = createMaterialTopTabNavigator();

export default function TabLayout() {
  const {
    colors: { hotChilli, white },
  } = useAppTheme();

  const toDoTasks = [...taskMap.values()].filter(
    (task) => task.status === 'toDo',
  );

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
        component={ToDo}
        options={createOptions('toDo', toDoTasks.length)}
      />
      <Tabs.Screen
        name="done"
        component={Done}
        options={createOptions('done', taskMap.size - toDoTasks.length)}
      />
    </Tabs.Navigator>
  );
}

function createOptions(status: 'toDo' | 'done', counts: number) {
  const options: MaterialTopTabNavigationOptions = {
    title: status,
    tabBarIcon: ({ color }) => (
      <Text style={{ color, textAlign: 'center' }}>{counts}</Text>
    ),
    tabBarIconStyle: {
      minHeight: Platform.OS === 'ios' ? 32 : 36, // Equal to the above Text variant font size in iOS while a little bigger in Android
      minWidth: 32, // Also need to adapt the above variant size to show enough width when counts are 2-digit
    },
    tabBarLabelStyle: {
      fontFamily: 'MontserratBold',
      fontSize: 13,
    },
  };

  return options;
}
