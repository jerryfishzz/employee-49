import { StyleSheet } from 'react-native';

import { ContentRow, ContentRowProps } from './ContentRow';

type ContentRowAndroidProps = Omit<ContentRowProps, 'style'>;

export function ContentRowAndroid({ testID, blocks }: ContentRowAndroidProps) {
  return <ContentRow testID={testID} blocks={blocks} style={styles.android} />;
}

const styles = StyleSheet.create({
  android: {
    paddingRight: 24,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 6,
    marginTop: 6,
  },
});
