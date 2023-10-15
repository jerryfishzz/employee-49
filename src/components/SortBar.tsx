import { StyleSheet } from 'react-native';
import { Button, Divider, Menu } from 'react-native-paper';
import { useState } from 'react';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';

export default function SortBar() {
  const [title, setTitle] = useState('Item 1');

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handlePress = (item: string) => {
    setTitle(item);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="menu-down"
            onPress={openMenu}
          >
            {title}
          </Button>
        }
      >
        <Menu.Item
          leadingIcon="check"
          onPress={() => {
            handlePress('Item 1');
          }}
          title="Item 1"
        />
        <Menu.Item
          onPress={() => {
            handlePress('Item 2');
          }}
          title="Item 2"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handlePress('Item 3');
          }}
          title="Item 3"
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: paySauceColor.midGrey,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 16,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
  button: {
    borderRadius: 4,
  },
});
