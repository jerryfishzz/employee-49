import { Platform, ScrollView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import date from 'date-and-time';

import { View } from 'src/components/Themed';
import { ContentRow, ContentRowAndroid } from 'src/components/ContentRow';
import { Dot, RowDotAndroid } from 'src/components/ui';
import { PRIORITY } from 'src/data/Priority';
import { DetailProps, DetailRowData } from './types';
import { createContentBlock, createTitleBlock } from './helpers';
import { STATUS } from 'src/data/Status';
import { useAppTheme } from 'src/hooks/useAppTheme';

export function Detail({
  task: { status, description, due, priority },
}: DetailProps) {
  const {
    colors: { borderBottom },
  } = useAppTheme();

  const detailRowData: DetailRowData[] = [
    {
      blocks: [createTitleBlock('Status'), createContentBlock(STATUS[status])],
    },
    {
      blocks: [
        createTitleBlock('Due'),
        createContentBlock(date.format(new Date(due), 'D MMMM, YYYY')),
      ],
    },
    {
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
      isBorderBottomHidden: true,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS === 'android' ? (
          <>
            {detailRowData.map(
              ({ blocks, right, isBorderBottomHidden }, index) => (
                <ContentRowAndroid
                  key={index}
                  blocks={right ? [...blocks, right.android] : blocks}
                  style={
                    !isBorderBottomHidden
                      ? {
                          ...styles.borderBottom,
                          borderBottomColor: borderBottom,
                        }
                      : undefined
                  }
                />
              ),
            )}
          </>
        ) : (
          <>
            {detailRowData.map(
              ({ blocks, right, isBorderBottomHidden }, index) => (
                <List.Item
                  key={index}
                  title={<ContentRow blocks={blocks} />}
                  right={
                    right
                      ? (props) => (
                          <List.Icon {...props} icon={() => right.others} />
                        )
                      : undefined
                  }
                  style={
                    !isBorderBottomHidden
                      ? [
                          styles.borderBottom,
                          { borderBottomColor: borderBottom },
                        ]
                      : undefined
                  }
                />
              ),
            )}
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
  borderBottom: {
    borderBottomWidth: 2,
  },
});
