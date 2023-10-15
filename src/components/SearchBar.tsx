import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { Search } from './ui';

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
        activeOutlineColor={colors.high}
        placeholder="Search"
        outlineStyle={{ borderRadius: 24 }}
        left={<TextInput.Icon icon={() => <Search />} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: midGrey,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});
