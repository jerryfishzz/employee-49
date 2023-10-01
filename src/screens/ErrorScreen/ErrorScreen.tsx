import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';
import { Error } from 'src/components/ui';

type ErrorScreenProps = {
  msg: string;
  zodMsg?: string;
  setState: Dispatch<SetStateAction<boolean>>;
};

export function ErrorScreen({ msg, zodMsg, setState }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Error size={64} style={styles.error} />
      <Text variant="bodyLarge" style={styles.text}>
        {msg}
      </Text>
      {zodMsg && (
        <Text variant="bodyLarge" style={styles.text}>
          {zodMsg}
        </Text>
      )}
      <Button
        onPress={() => {
          setState(true);
        }}
      >
        REFRESH
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 32,
  },
  error: {
    margin: 16,
  },
  text: {
    textAlign: 'center',
    marginVertical: 4,
  },
});
