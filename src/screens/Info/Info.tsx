import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { View } from 'src/components/Themed';
import { CheckCircle, Error } from 'src/components/ui';
import { useAppTheme } from 'src/hooks/useAppTheme';

type InfoProps = {
  type: 'error' | 'hint';
  msg?: string;
  secondMsg?: string;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export function Info({ type, msg, secondMsg, setEnabled }: InfoProps) {
  const { colors } = useAppTheme();

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
        style={styles.button}
        labelStyle={styles.label}
        textColor={colors.high}
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
  button: {
    margin: 16,
    padding: 8,
  },
  label: {
    fontSize: 24,
    lineHeight: 24,
  },
});
