import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';

type ErrorScreenProps = {
  msg: string;
  setState: Dispatch<SetStateAction<boolean>>;
};

export function ErrorScreen({ msg, setState }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{msg}</Text>

      <Button
        onPress={() => {
          setState(true);
        }}
      >
        Refresh
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
