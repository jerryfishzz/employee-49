import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { useState } from 'react';

const { midGrey } = paySauceColor;

export default function SearchBar() {
  const { colors } = useAppTheme();
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        mode="outlined"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: midGrey,
    paddingTop: 16,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
