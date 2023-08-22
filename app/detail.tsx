import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'src/components/Themed';

export default function Route() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
