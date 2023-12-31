import { Platform } from 'react-native';
import date from 'date-and-time';

import { Block } from 'src/components/ContentRow';

export function createTitleBlock(title: string): Block {
  return {
    type: 'text',
    content: title,
    variant: 'titleLarge',
    viewStyle: {
      flex: 1,
      paddingLeft: Platform.OS === 'android' ? 16 : 0,
    },
    textStyle: {
      fontSize: 20,
    },
  };
}

export function createContentBlock(content: string): Block {
  return {
    type: 'text',
    variant: 'titleMedium',
    content,
    viewStyle: {
      maxWidth: '70%',
    },
  };
}

export function makeGetBlocks(title: string, dateStr: string | null) {
  return (): Block[] =>
    dateStr
      ? [
          createTitleBlock(title),
          createContentBlock(date.format(new Date(dateStr), 'D MMMM, YYYY')),
        ]
      : [];
}
