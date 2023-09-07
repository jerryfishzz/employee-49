import { Block } from 'src/components/ContentRow';

export function createTitleBlock(title: string): Block {
  return {
    type: 'text',
    content: title,
    variant: 'titleLarge',
    viewStyle: {
      flex: 1,
    },
  };
}

export function createContentBlock(content: string): Block {
  return {
    type: 'text',
    variant: 'titleMedium',
    content,
  };
}
