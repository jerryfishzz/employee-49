import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'src/components/Themed';

export function Detail() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
