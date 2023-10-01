import { Banner, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { View } from './Themed';
import { hideNotice, useEmployee } from 'src/context/employee';
import { CheckCircle, Error } from './ui';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { NoticeElement, getStyledIcon } from './utils';

export function Notification() {
  const [
    {
      notification: { visible, notice, type },
    },
    dispatch,
  ] = useEmployee();

  const { top, bottom } = useSafeAreaInsets();

  // eslint-disable-next-line prefer-const
  let Icon: NoticeElement['Icon'] = Error;
  let backgroundColor: NoticeElement['backgroundColor'] = undefined;
  let contentColor: NoticeElement['contentColor'] = undefined;

  const { colors } = useAppTheme();

  if (type === 'error') {
    backgroundColor = colors.error;
    contentColor = colors.onError;
  }

  if (type === 'success') {
    Icon = CheckCircle;
    backgroundColor = colors.normal;
    contentColor = colors.onNormal;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => hideNotice(dispatch)}>
        <Banner
          visible={visible}
          elevation={3}
          contentStyle={{
            marginTop: visible ? top : 0,
            marginBottom: visible ? bottom : 0,
          }}
          style={{ backgroundColor }}
          icon={() => getStyledIcon({ Icon, backgroundColor, contentColor })}
        >
          <Text variant="bodyLarge" style={{ color: contentColor }}>
            {notice}
          </Text>
        </Banner>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
