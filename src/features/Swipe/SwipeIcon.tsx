import { Animated, StyleSheet } from 'react-native';

import { Check } from 'src/components/ui';
import { useAppTheme } from 'src/hooks/useAppTheme';

export function SwipeIcon() {
  const {
    colors: { normal, onNormal },
  } = useAppTheme();

  return (
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
