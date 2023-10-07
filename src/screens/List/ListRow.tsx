import { Platform, StyleSheet } from 'react-native';
import date from 'date-and-time';
import { List } from 'react-native-paper';

import {
  Block,
  ContentRow,
  ContentRowAndroid,
} from 'src/components/ContentRow';
import { paySauceColor } from 'src/data/Colors';
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
import { Dispatch, SetStateAction, useState } from 'react';

type ListRowProps = {
  item: Task;
  routeName: keyof RootTabParamList;
  data: Task[]; // Results from the server
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

const { midGrey } = paySauceColor;

export function ListRow({ item, routeName, data, setEnabled }: ListRowProps) {
  const [isFoldingUp, setIsFoldingUp] = useState<boolean>(false);

  const { id, title, due, priority } = item;

  const { colors } = useAppTheme();
  const { borderBottom, high, normal, background, surfaceVariant } = colors;

  const dueColor =
    routeName === 'index' ? (isOverdue(due) ? high : midGrey) : normal;

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
    },
  };

  const dueBlock: Block = {
    type: 'text',
    content: date.format(new Date(due), 'D MMM'),
    variant: 'titleMedium',
    textStyle: {
      color: dueColor,
    },
    viewStyle: {
      backgroundColor: isFoldingUp ? surfaceVariant : undefined,
    },
  };

  const dotBlockAndroid: Block = {
    type: 'icon',
    content: (
      <RowDotAndroid
        iconColor={colors[priority]}
        style={getFoldingUpBackGroundColor(isFoldingUp, surfaceVariant)}
      />
    ),
  };

  const forwardBlockAndroid: Block = {
    type: 'icon',
    content: (
      <RowForwardAndroid
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
        setEnabled={setEnabled}
        id={id}
        data={data}
        isFoldingUp={isFoldingUp}
        setIsFoldingUp={setIsFoldingUp}
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
      setEnabled={setEnabled}
      id={id}
      data={data}
      isFoldingUp={isFoldingUp}
      setIsFoldingUp={setIsFoldingUp}
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
                    iconColor={colors[priority]}
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
