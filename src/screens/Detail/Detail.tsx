import { Platform, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import date from 'date-and-time';
import { v4 as uuidv4 } from 'uuid';

import { View } from 'src/components/Themed';
import { ContentRow, ContentRowAndroid } from 'src/components/ContentRow';
import { Dot, RowDotAndroid } from 'src/components/ui';
import { PRIORITY } from 'src/data/Priority';
import { DetailProps, DetailRowData } from './types';
import { createContentBlock, createTitleBlock } from './helpers';
import { STATUS } from 'src/data/Status';

export function Detail({
  task: { status, description, due, priority },
}: DetailProps) {
  const detailRowData: DetailRowData[] = [
    {
      id: uuidv4(),
      blocks: [createTitleBlock('Status'), createContentBlock(STATUS[status])],
    },
    {
      id: uuidv4(),
      blocks: [
        createTitleBlock('Due'),
        createContentBlock(date.format(new Date(due), 'D MMMM, YYYY')),
      ],
    },
    {
      id: uuidv4(),
      blocks: [
        createTitleBlock('Priority'),
        createContentBlock(
          `${priority.charAt(0).toUpperCase()}${priority.slice(1)}`,
        ),
      ],
      right: {
        android: {
          type: 'icon',
          content: <RowDotAndroid iconColor={PRIORITY[priority].color} />,
        },
        others: <Dot iconColor={PRIORITY[priority].color} />,
      },
    },
    {
      id: uuidv4(),
      blocks: [
        {
          type: 'text',
          content: description,
          variant: 'titleMedium',
          viewStyle: {
            flex: 1,
            paddingLeft: Platform.OS === 'android' ? 16 : 0,
          },
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS === 'android' ? (
          <>
            {detailRowData.map(({ blocks, right, id }) => (
              <ContentRowAndroid
                key={id}
                blocks={right ? [...blocks, right.android] : blocks}
              />
            ))}
          </>
        ) : (
          <>
            {detailRowData.map(({ blocks, right, id }) => (
              <List.Item
                key={id}
                title={<ContentRow blocks={blocks} />}
                right={
                  right
                    ? (props) => (
                        <List.Icon {...props} icon={() => right.others} />
                      )
                    : undefined
                }
              />
            ))}
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
