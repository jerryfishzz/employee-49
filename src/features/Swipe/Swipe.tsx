import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

import { RootTabParamList } from 'src/navigation/types';
import { SwipeIcon } from './SwipeIcon';
import { useCreatePostMutation } from 'src/hooks/useCreatePostMutation';
import { Task } from 'src/utils/schema';
import { useQueryClient } from '@tanstack/react-query';
import { modifyTaskStatus, refreshTasksWithDelay } from 'src/utils/helpers';

type SwipeProps = {
  setEnabled: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  id: Task['id'];
  data: Task[]; // Results from the server
  routeName: keyof RootTabParamList;
  isFoldingUp: boolean;
  setIsFoldingUp: Dispatch<SetStateAction<boolean>>;
};

export function Swipe({
  routeName,
  setEnabled,
  children,
  id,
  data,
  isFoldingUp,
  setIsFoldingUp,
}: SwipeProps) {
  const scaleAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
  const transYAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  const swipeableRef = useRef<Swipeable>(null);

  const createPostMutation = useCreatePostMutation({
    runOnSuccess: () => {
      refreshTasksWithDelay(setEnabled);
    },
    runOnError: () => {
      refreshTasksWithDelay(setEnabled);
    },
  });

  const openSwipeLeft = () => {
    if (routeName === 'index') {
      setIsFoldingUp(true);
    } else {
      console.log('Tab two swipe left completed');
    }
  };

  const queryClient = useQueryClient();

  const closeSwipeLeft = () => {
    // Only run anim and completeTask when swiping left is done
    if (routeName === 'index' && isFoldingUp) {
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
        // Create expected data and update the query manually.
        // Note, there is no real query happened by using manual update.
        // By doing so, it can make the success animation run properly
        // no matter if the real query later succeeds or not.
        const newData = data.map((item) => {
          if (item.id !== id) return item;

          const modifiedTask = modifyTaskStatus(item);
          createPostMutation.mutate(modifiedTask);

          return modifiedTask;
        });
        queryClient.setQueryData(['tasks'], newData);
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
            renderRightActions={() => <SwipeIcon routeName={routeName} />}
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