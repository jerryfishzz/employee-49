import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from 'src/components/Themed';

type ErrorScreenProps = {
  msg: string;
};

export function ErrorScreen({ msg }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{msg}</Text>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Link>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
