import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';
import { CheckCircle, Error } from 'src/components/ui';

type InfoProps = {
  type: 'error' | 'hint';
  msg?: string;
  secondMsg?: string;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export function Info({ type, msg, secondMsg, setEnabled }: InfoProps) {
  return (
    <View style={styles.container}>
      {type === 'error' ? (
        <Error size={64} style={styles.icon} />
      ) : (
        <CheckCircle size={64} style={styles.icon} />
      )}
      {msg && (
        <Text variant="bodyLarge" style={styles.text}>
          {msg}
        </Text>
      )}
      {secondMsg && (
        <Text variant="bodyLarge" style={styles.text}>
          {secondMsg}
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
  icon: {
    margin: 16,
  },
  text: {
    textAlign: 'center',
    marginVertical: 4,
  },
});
