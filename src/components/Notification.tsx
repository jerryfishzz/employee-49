import { useState } from 'react';
import { Banner, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';

export function Notification() {
  const [visible, setVisible] = useState(true);
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(false)}>
        <Banner
          visible={visible}
          elevation={3}
          contentStyle={{
            marginTop: visible ? top : 0,
            marginBottom: visible ? bottom : 0,
          }}
          style={styles.banner}
        >
          <Text variant="bodyLarge" style={styles.text}>
            There was a problem processing a transaction on your credit card.
          </Text>
        </Banner>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  banner: {
    backgroundColor: paySauceColor.blueberry,
  },
  text: {
    color: paySauceColor.white,
  },
});
