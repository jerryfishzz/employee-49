import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';

import { RootTabParamList } from 'src/navigation/types';
import { SwipeIcon } from './SwipeIcon';
import { useCreatePostMutation } from 'src/hooks/useCreatePostMutation';
import { Task } from 'src/utils/schema';
import { modifyTaskStatus, refreshTasksWithDelay } from 'src/utils/helpers';
import { runLayoutAnim } from './runLayoutAnim';

type SwipeProps = {
  children: ReactNode;
  id: Task['id'];
  data: Task[]; // Results from the server
  routeName: keyof RootTabParamList;
  isFoldingUp: boolean;
  setIsFoldingUp: Dispatch<SetStateAction<boolean>>;
  refetch: UseQueryResult['refetch'];
};

export function Swipe({
  routeName,
  children,
  id,
  data,
  isFoldingUp,
  setIsFoldingUp,
  refetch,
}: SwipeProps) {
  const scaleAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
  const transYAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  const swipeableRef = useRef<Swipeable>(null);

  const createPostMutation = useCreatePostMutation({
    runOnSuccess: () => {
      refreshTasksWithDelay(refetch);
    },
    runOnError: () => {
      refreshTasksWithDelay(refetch);
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
    // Only run anim when swiping left is done
    if (isFoldingUp) {
      // Set different values depending on platform
      // since layout anim doesn't work on Android.
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: Platform.OS === 'android' ? 0.2 : 0.6,
          duration: Platform.OS === 'android' ? 100 : 200,
          useNativeDriver: true,
        }),
        Animated.timing(transYAnim, {
          toValue: Platform.OS === 'android' ? -180 : -30,
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

        // This method doesn't work on Android. No ideas yet.
        runLayoutAnim();

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
        <Swipeable
          renderRightActions={() => (
            <SwipeIcon
              routeName={routeName}
              closeSwipeLeft={closeSwipeLeft}
              setIsFoldingUp={setIsFoldingUp}
            />
          )}
          onSwipeableOpen={() => openSwipeLeft()}
          onSwipeableClose={() => closeSwipeLeft()}
          ref={swipeableRef}
        >
          {children}
        </Swipeable>
      </Animated.View>
    </Animated.View>
  );
}
