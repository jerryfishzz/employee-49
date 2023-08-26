import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from 'src/components/Themed';
import { Row } from 'src/components/ui/Row';
import { taskMap } from 'src/data/task';

export function ToDo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TO DO</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Open up the code for this screen:
        </Text>
        <FlatList
          data={[...taskMap.values()]}
          renderItem={({ item }) => (
            <Row>
              <Row.Text testID={`row-${item.id}`}>{item.title}</Row.Text>
              <Row.Text>{item.id}</Row.Text>
            </Row>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
