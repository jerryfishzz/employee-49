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
import { PRIORITY } from 'src/data/Priority';
import { DetailProps } from './types';
import { createContentBlock, createTitleBlock } from './helpers';
import { STATUS } from 'src/data/Status';

export function Detail({
  task: { status, description, due, priority },
}: DetailProps) {
  const statusBlocks: Block[] = [
    createTitleBlock('Status'),
    createContentBlock(STATUS[status]),
  ];

  const dueBlocks: Block[] = [
    createTitleBlock('Due'),
    createContentBlock(date.format(new Date(due), 'D MMMM, YYYY')),
  ];

  const priorityBlocks: Block[] = [
    createTitleBlock('Priority'),
    createContentBlock(
      `${priority.charAt(0).toUpperCase()}${priority.slice(1)}`,
    ),
  ];

  const priorityRightIcon: Block = {
    type: 'icon',
    content: <RowDotAndroid iconColor={PRIORITY[priority].color} />,
  };

  const descriptionBlocks: Block[] = [
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
            <ContentRowAndroid blocks={statusBlocks} />
            <ContentRowAndroid blocks={dueBlocks} />
            <ContentRowAndroid
              blocks={[...priorityBlocks, priorityRightIcon]}
            />
            <ContentRowAndroid blocks={descriptionBlocks} />
          </>
        ) : (
          <>
            <List.Item title={<ContentRow blocks={statusBlocks} />} />
            <List.Item title={<ContentRow blocks={dueBlocks} />} />
            <List.Item
              title={<ContentRow blocks={priorityBlocks} />}
              right={(props) => (
                <List.Icon
                  {...props}
                  icon={() => <Dot iconColor={PRIORITY[priority].color} />}
                />
              )}
            />
            <List.Item title={<ContentRow blocks={descriptionBlocks} />} />
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
