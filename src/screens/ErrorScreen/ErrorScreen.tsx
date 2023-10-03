import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';
import { CheckCircle, Error } from 'src/components/ui';

type ErrorScreenProps = {
  type: 'error' | 'hint';
  msg?: string;
  zodMsg?: string;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export function ErrorScreen({
  type,
  msg,
  zodMsg,
  setEnabled,
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      {type === 'error' ? (
        <Error size={64} style={styles.error} />
      ) : (
        <CheckCircle size={64} style={[styles.error]} />
      )}
      {msg && (
        <Text variant="bodyLarge" style={styles.text}>
          {msg}
        </Text>
      )}
      {zodMsg && (
        <Text variant="bodyLarge" style={styles.text}>
          {zodMsg}
        </Text>
      )}

      <Button
        onPress={() => {
          setEnabled?.(true);
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
