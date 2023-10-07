import { Animated, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'src/components/Themed';

import { Check, RotateLeft } from 'src/components/ui';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { RootTabParamList } from 'src/navigation/types';

type SwipeIconProps = {
  routeName: keyof RootTabParamList;
};

export function SwipeIcon({ routeName }: SwipeIconProps) {
  const {
    colors: { normal, onNormal, low, onLow },
  } = useAppTheme();

  return routeName === 'index' ? (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: normal,
        },
      ]}
    >
      {/* Note, here must have something (non-blank); otherwise, swipe left won't happen. */}
      <Check
        size={36}
        iconColor={onNormal}
        style={{ backgroundColor: normal }}
      />
    </Animated.View>
  ) : (
    <View style={[styles.container, { backgroundColor: low }]}>
      <TouchableOpacity>
        <RotateLeft
          size={36}
          iconColor={onLow}
          style={{ backgroundColor: low }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
  },

  // foldingUp: {
  //   color: greys.lightGrey,
  //   textDecorationLine: 'line-through',
  // },
});
