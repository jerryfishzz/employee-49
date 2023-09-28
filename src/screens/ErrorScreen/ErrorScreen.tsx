import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from 'src/components/Themed';

type ErrorScreenProps = {
  msg: string;
  setState: Dispatch<SetStateAction<boolean>>;
};

export function ErrorScreen({ msg, setState }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{msg}</Text>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
