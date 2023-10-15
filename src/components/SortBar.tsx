import { StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import { useState } from 'react';

import { View } from './Themed';
import { paySauceColor } from 'src/data/Colors';
import { RootTabParam } from 'src/navigation/types';

type SortBarProps = {
  rootTabParam: RootTabParam;
};

export default function SortBar({
  rootTabParam: { menuItems, defaultItem },
}: SortBarProps) {
  const [title, setTitle] = useState<string>(defaultItem);

  const [visible, setVisible] = useState<boolean>(false);

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
        {menuItems.map((item) => (
          <Menu.Item
            key={item}
            contentStyle={[
              styles.menuContent,
              {
                paddingLeft: item === title ? 0 : 32,
              },
            ]}
            leadingIcon={item === title ? 'check' : undefined}
            onPress={() => {
              handlePress(item);
            }}
            title={item}
          />
        ))}
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
  menuContent: {
    paddingRight: 16,
  },
});
