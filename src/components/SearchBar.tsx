import { StyleSheet } from 'react-native';
import { Searchbar as PaperSearchBar } from 'react-native-paper';
import { useState } from 'react';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';

const { midGrey } = paySauceColor;

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <PaperSearchBar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
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
