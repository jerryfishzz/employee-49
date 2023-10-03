import { Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import date from 'date-and-time';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { View } from 'src/components/Themed';
import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';
import { CheckCircle, Dot, RotateLeft, RowDotAndroid } from 'src/components/ui';
import { DetailProps, DetailRowData } from './types';
import { createContentBlock, createTitleBlock, makeGetBlocks } from './helpers';
import { STATUS } from 'src/data/Status';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { paySauceColor } from 'src/data/Colors';
import { getStyledIcon } from 'src/components/utils';
import { getTasks, updateDetail } from 'src/utils/api';
import { useQueryWithRefreshOnFocus } from 'src/hooks/useQueryWithRefreshOnFocus';
import { runNoticeCombo, useEmployee } from 'src/context/employee';
import { getErrorText } from 'src/utils/helpers';
import { useRefreshing } from 'src/hooks/useRefreshing';

export function Detail({
  task,
  setEnabled: setTaskQueryEnabled,
  fetchStatus,
}: DetailProps) {
  const { id, title, status, description, due, priority, completed } = task;
  const { colors } = useAppTheme();
  const { borderBottom, surfaceVariant, normal, low } = colors;

  const [, setEnabled] = useQueryWithRefreshOnFocus(getTasks, false);

  const [, dispatch] = useEmployee();

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: updateDetail,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['detail', id]);
      queryClient.setQueryData(['detail', id], data);

      // Delay setEnabled a little bit to have a better visual effect on notice emerging
      setTimeout(() => {
        setEnabled(true);
      }, 500);

      runNoticeCombo(dispatch, 'Status modified', 'SHOW_SUCCESS_NOTICE');
    },
    onError: (error) => {
      (error as AxiosError).status !== 404 &&
        runNoticeCombo(
          dispatch,
          getErrorText(error as AxiosError),
          'SHOW_ERROR_NOTICE',
        );
    },
  });

  const [refreshing, onRefresh] = useRefreshing(
    setTaskQueryEnabled,
    fetchStatus,
  );

  const handlePress = () => {
    createPostMutation.mutate({
      ...task,
      status: status === 'done' ? 'toDo' : 'done',
      completed: status === 'done' ? null : new Date().toISOString(),
    });
  };

  const detailRowData: DetailRowData[] = [
    {
      blocks: [createTitleBlock('Title'), createContentBlock(title)],
    },
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
      blocks: [],
      getBlocks: makeGetBlocks('Completed', completed),
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
          content: <RowDotAndroid iconColor={colors[priority]} />,
        },
        others: <Dot iconColor={colors[priority]} />,
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <>
          {detailRowData.map(
            (
              {
                blocks: blocksFromSetting,
                right,
                isBorderBottomHidden,
                getBlocks,
              },
              index,
            ) => {
              let blocks: Block[] = blocksFromSetting;
              if (getBlocks) blocks = [...getBlocks()];

              if (!blocks.length) return null;

              const borderBottomStyle = !isBorderBottomHidden && [
                styles.borderBottom,
                { borderBottomColor: borderBottom },
              ];

              if (Platform.OS === 'android') {
                return (
                  <ContentRowAndroid
                    key={index}
                    blocks={right ? [...blocks, right.android] : blocks}
                    style={borderBottomStyle}
                  />
                );
              }

              return (
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
                  style={borderBottomStyle}
                />
              );
            },
          )}
        </>
      </ScrollView>
      <View
        style={[styles.touchableWrapper, { backgroundColor: surfaceVariant }]}
      >
        <TouchableOpacity style={styles.touchableBtn} onPress={handlePress}>
          {status === 'toDo'
            ? getStyledIcon({
                Icon: CheckCircle,
                size: 56,
                backgroundColor: surfaceVariant,
                contentColor: normal,
              })
            : getStyledIcon({
                Icon: RotateLeft,
                size: 56,
                backgroundColor: surfaceVariant,
                contentColor: low,
              })}
          <Text variant="titleLarge" style={styles.btnText}>
            MARK AS {status === 'toDo' ? 'DONE' : 'TODO'}
          </Text>
        </TouchableOpacity>
      </View>
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
  touchableWrapper: {
    height: '20%',
    shadowColor: paySauceColor.midGrey,
    shadowOffset: { width: 0, height: -6 }, // Shadow on which side
    shadowOpacity: 0.3,
    shadowRadius: 5, // Gradient effect. the bigger, the stronger.
  },
  touchableBtn: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
  },
  btnText: {
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
