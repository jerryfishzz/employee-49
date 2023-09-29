import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';
import { paySauceColor } from 'src/data/Colors';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        animating={true}
        color={paySauceColor.hotChilli}
        style={styles.indicator}
      />
      <Text variant="bodyLarge">LOADING...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 32,
  },
  indicator: {
    margin: 16,
  },
});
