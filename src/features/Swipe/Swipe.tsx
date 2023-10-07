import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

import { RootTabParamList, RootTabScreenProps } from 'src/navigation/types';
import { SwipeIcon } from './SwipeIcon';
import { useCreatePostMutation } from 'src/hooks/useCreatePostMutation';
import { Task } from 'src/utils/schema';

type SwipeProps = {
  setEnabled: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  task: Task;
} & RootTabScreenProps<keyof RootTabParamList>;

export function Swipe({ route, setEnabled, children, task }: SwipeProps) {
  const [isFoldingUp, setIsFoldingUp] = useState<boolean>(false);

  const scaleAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
  const transYAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  const swipeableRef = useRef<Swipeable>(null);

  const createPostMutation = useCreatePostMutation(setEnabled);

  const openSwipeLeft = () => {
    if (route.name === 'index') {
      setIsFoldingUp(true);
    } else {
      console.log('Tab two swipe left completed');
    }
  };

  const closeSwipeLeft = () => {
    // Only run anim and completeTask when swiping left is done
    if (route.name === 'index' && isFoldingUp) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(transYAnim, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // setTimeout can make the seamless transition between animation
      setTimeout(() => {
        createPostMutation.mutate({
          ...task,
          status: task.status === 'done' ? 'toDo' : 'done',
          completed: task.status === 'done' ? null : new Date().toISOString(),
        });
      }, 5);
    }
  };

  useEffect(() => {
    // Only run close when isFoldingUp is true
    // to make sure swiping left completed
    isFoldingUp && swipeableRef?.current?.close();
  }, [isFoldingUp]);

  return (
    <Animated.View style={[{ transform: [{ scaleY: scaleAnim }] }]}>
      <Animated.View style={[{ transform: [{ translateY: transYAnim }] }]}>
        {/* This wrapper is for gestures on android  */}
        <GestureHandlerRootView>
          <Swipeable
            renderRightActions={() => <SwipeIcon routeName={route.name} />}
            onSwipeableOpen={() => openSwipeLeft()}
            onSwipeableClose={() => closeSwipeLeft()}
            ref={swipeableRef}
          >
            {children}
          </Swipeable>
        </GestureHandlerRootView>
      </Animated.View>
    </Animated.View>
  );
}
