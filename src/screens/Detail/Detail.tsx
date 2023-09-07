import { Platform, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import date from 'date-and-time';

import { View } from 'src/components/Themed';
import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';
import { Dot, RowDotAndroid } from 'src/components/ui';
import { PRIORITY } from 'src/constants/Priority';
import { DetailProps } from './types';
import { createContentBlock, createTitleBlock } from './helpers';

export function Detail({
  task: { status, description, due, priority },
}: DetailProps) {
  const statusRow: Block[] = [
    createTitleBlock('Status'),
    createContentBlock(status),
  ];

  const dueRow: Block[] = [
    createTitleBlock('Due'),
    createContentBlock(date.format(new Date(due), 'D MMMM, YYYY')),
  ];

  const priorityRow: Block[] = [
    createTitleBlock('Priority'),
    createContentBlock(
      `${priority.charAt(0).toUpperCase()}${priority.slice(1)}`,
    ),
  ];

  const priorityIcon: Block = {
    type: 'icon',
    content: <RowDotAndroid iconColor={PRIORITY[priority].color} />,
  };

  const descriptionRow: Block[] = [
    {
      type: 'text',
      content: description,
      variant: 'titleMedium',
      viewStyle: {
        flex: 1,
        paddingLeft: Platform.OS === 'android' ? 16 : 0,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS === 'android' ? (
          <>
            <ContentRowAndroid blocks={statusRow} />
            <ContentRowAndroid blocks={dueRow} />
            <ContentRowAndroid blocks={[...priorityRow, priorityIcon]} />
            <ContentRowAndroid blocks={descriptionRow} />
          </>
        ) : (
          <>
            <List.Item title={<ContentRow blocks={statusRow} />} />
            <List.Item title={<ContentRow blocks={dueRow} />} />
            <List.Item
              title={<ContentRow blocks={priorityRow} />}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={() => <Dot iconColor={PRIORITY[priority].color} />}
                />
              )}
            />
            <List.Item title={<ContentRow blocks={descriptionRow} />} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
