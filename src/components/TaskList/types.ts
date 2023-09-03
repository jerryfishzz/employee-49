export interface Item {
  id: string;
  title: string;
}

export interface TitleProps<T extends Item> {
  item: T;
}

export interface TaskListProps<T extends Item> {
  data: T[];
}
