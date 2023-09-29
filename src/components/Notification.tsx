import { Banner, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OpaqueColorValue, StyleSheet } from 'react-native';
import { FC } from 'react';

import { View } from './Themed';
import { hideNotice, useEmployee } from 'src/context/employee';
import { Error } from './ui';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { IconProps } from './ui/icons/types';

type NoticeElement = {
  Icon: FC<IconProps>;
  bannerColor?: string | OpaqueColorValue | undefined;
  contentColor?: string | OpaqueColorValue | undefined;
};

function getStyledIcon({
  Icon,
  bannerColor,
  contentColor,
}: NoticeElement): JSX.Element {
  return (
    <Icon iconColor={contentColor} style={{ backgroundColor: bannerColor }} />
  );
}

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
  let bannerColor: NoticeElement['bannerColor'] = undefined;
  let contentColor: NoticeElement['contentColor'] = undefined;

  const { colors } = useAppTheme();

  if (type === 'error') {
    bannerColor = colors.error;
    contentColor = colors.onError;
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
          style={{ backgroundColor: bannerColor }}
          icon={() => getStyledIcon({ Icon, bannerColor, contentColor })}
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
