import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'src/components/Themed';

import { Check, RotateLeft } from 'src/components/ui';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { RootTabParamList } from 'src/navigation/types';

type SwipeIconProps = {
  routeName: keyof RootTabParamList;
  closeSwipeLeft: () => void;
  setIsFoldingUp: Dispatch<SetStateAction<boolean>>;
};

export function SwipeIcon({
  routeName,
  closeSwipeLeft,
  setIsFoldingUp,
}: SwipeIconProps) {
  const {
    colors: { normal, onNormal, low, onLow },
  } = useAppTheme();

  const handlePress = () => {
    setIsFoldingUp(true);
    closeSwipeLeft();
  };

  return routeName === 'index' ? (
    <View
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
    </View>
  ) : (
    <View style={[styles.container, { backgroundColor: low }]}>
      <TouchableOpacity onPress={handlePress}>
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
});
