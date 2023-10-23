import { Platform, StyleSheet } from 'react-native';
import date from 'date-and-time';
import { List } from 'react-native-paper';
import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';
import { useAppTheme } from 'src/hooks/useAppTheme';
import { Task } from 'src/utils/schema';
import { RootTabParamList } from 'src/navigation/types';
import {
  Dot,
  Forward,
  RowDotAndroid,
  RowForwardAndroid,
} from 'src/components/ui';
import { Swipe } from 'src/features/Swipe/Swipe';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ListRowProps = {
  item: Task;
  routeName: keyof RootTabParamList;
  data: Task[]; // Results from the server
  refetch: UseQueryResult['refetch'];
};

export function ListRow({ item, routeName, data, refetch }: ListRowProps) {
  const [isFoldingUp, setIsFoldingUp] = useState<boolean>(false);

  const { id, title, due, priority } = item;

  const { colors } = useAppTheme();
  const {
    borderBottom,
    high,
    normal,
    background,
    surfaceVariant,
    onSurfaceVariant,
    onBackground,
  } = colors;

  const dueColor =
    routeName === 'index' ? (isOverdue(due) ? high : onBackground) : normal;

  const titleBlock: Block = {
    type: 'text',
    content: title,
    variant: 'titleLarge',
    viewStyle: {
      flex: 1,
      paddingLeft: Platform.OS === 'android' ? 16 : 0,
      paddingRight: 12,
      backgroundColor: isFoldingUp ? surfaceVariant : undefined,
    },
    textStyle: {
      fontSize: 20,
      textDecorationLine: isFoldingUp ? 'line-through' : undefined,
      color: isFoldingUp ? onSurfaceVariant : onBackground,
    },
  };

  const dueBlock: Block = {
    type: 'text',
    content: date.format(new Date(due), 'D MMM'),
    variant: 'titleMedium',
    textStyle: {
      color: isFoldingUp ? onSurfaceVariant : dueColor,
      textDecorationLine: isFoldingUp ? 'line-through' : undefined,
    },
    viewStyle: {
      backgroundColor: isFoldingUp ? surfaceVariant : undefined,
    },
  };

  const dotBlockAndroid: Block = {
    type: 'icon',
    content: (
      <RowDotAndroid
        iconColor={isFoldingUp ? onSurfaceVariant : colors[priority]}
        style={getFoldingUpBackGroundColor(isFoldingUp, surfaceVariant)}
      />
    ),
  };

  const forwardBlockAndroid: Block = {
    type: 'icon',
    content: (
      <RowForwardAndroid
        iconColor={isFoldingUp ? onSurfaceVariant : undefined}
        style={[
          styles.forward,
          getFoldingUpBackGroundColor(isFoldingUp, surfaceVariant),
        ]}
      />
    ),
  };

  if (Platform.OS === 'android')
    return (
      <Swipe
        routeName={routeName}
        id={id}
        data={data}
        isFoldingUp={isFoldingUp}
        setIsFoldingUp={setIsFoldingUp}
        refetch={refetch}
      >
        <Link href={`/detail/${id}`} asChild>
          <TouchableOpacity>
            <ContentRowAndroid
              testID={id}
              blocks={[
                dotBlockAndroid,
                titleBlock,
                dueBlock,
                forwardBlockAndroid,
              ]}
              style={[
                { borderBottomColor: borderBottom },
                styles.bottomBorder,
                getFoldingUpBackGroundColor(isFoldingUp, surfaceVariant),
              ]}
            />
          </TouchableOpacity>
        </Link>
      </Swipe>
    );

  return (
    <Swipe
      routeName={routeName}
      id={id}
      data={data}
      isFoldingUp={isFoldingUp}
      setIsFoldingUp={setIsFoldingUp}
      refetch={refetch}
    >
      <Link href={`/detail/${id}`} asChild>
        <TouchableOpacity>
          <List.Item
            title={
              <ContentRow
                testID={id}
                blocks={[titleBlock, dueBlock]}
                style={getFoldingUpBackGroundColor(isFoldingUp, surfaceVariant)}
              />
            }
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => (
                  <Dot
                    iconColor={
                      isFoldingUp ? onSurfaceVariant : colors[priority]
                    }
                    style={getFoldingUpBackGroundColor(
                      isFoldingUp,
                      surfaceVariant,
                    )}
                  />
                )}
              />
            )}
            right={({ style, ...props }) => (
              <List.Icon
                style={[style, styles.forward]}
                {...props}
                icon={() => (
                  <Forward
                    iconColor={isFoldingUp ? onSurfaceVariant : undefined}
                    style={getFoldingUpBackGroundColor(
                      isFoldingUp,
                      surfaceVariant,
                    )}
                  />
                )}
              />
            )}
            style={[
              {
                borderBottomColor: borderBottom,
                backgroundColor: isFoldingUp ? surfaceVariant : background,
              },
              styles.listPadding,
              styles.bottomBorder,
            ]}
          />
        </TouchableOpacity>
      </Link>
    </Swipe>
  );
}

function isOverdue(due: Task['due']) {
  return new Date(due) < new Date() ? true : false;
}

function getFoldingUpBackGroundColor(isFoldingUp: boolean, color: string) {
  return isFoldingUp ? { backgroundColor: color } : undefined;
}

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 2,
  },
  listPadding: {
    paddingVertical: 12,
  },
  forward: {
    marginLeft: 4,
  },
  foldingUp: {
    textDecorationLine: 'line-through',
  },
});
