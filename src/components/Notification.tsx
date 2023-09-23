import { useState } from 'react';
import { Banner } from 'react-native-paper';

import { View } from './Themed';

export function Notification() {
  const [visible, setVisible] = useState(true);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Banner
        visible={visible}
        actions={[
          {
            label: 'Fix it',
            onPress: () => setVisible(false),
          },
          {
            label: 'Learn more',
            onPress: () => setVisible(false),
          },
        ]}
      >
        There was a problem processing a transaction on your credit card.
      </Banner>
    </View>
  );
}
