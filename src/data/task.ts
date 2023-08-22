import { Task, TaskMap } from './task.schema';

const arrayForTaskMap: Array<[string, Task]> = [
  [
    'task1',
    {
      id: 'task1',
      title: 'Build a fence',
      status: 'toDo',
      due: '2022-10-15T19:00:00+12:00',
      completed: null,
      priority: 'low',
      description:
        'Ipsum sint est ad proident cillum. Id consequat sit sit quis enim duis. Nostrud ad ex Lorem cupidatat ea incididunt dolor qui voluptate sunt ipsum.',
    },
  ],
  [
    'task2',
    {
      id: 'task2',
      title: 'Fix the tractor',
      status: 'toDo',
      due: '2022-09-05T04:25:00+12:00',
      completed: null,
      priority: 'high',
      description:
        'Id velit tempor consectetur exercitation eu incididunt id ex consectetur commodo et cillum adipisicing officia.',
    },
  ],
  [
    'task3',
    {
      id: 'task3',
      title: 'Clean gumboots',
      status: 'toDo',
      due: '2022-08-24T22:18:00+12:00',
      completed: null,
      priority: 'normal',
      description:
        'Non id ullamco irure elit commodo dolore veniam et magna aliquip tempor ex fugiat. Aliquip commodo ullamco aliqua dolor laborum aliqua proident sint commodo ad incididunt quis. Non sit ex laborum ut consequat amet nisi voluptate reprehenderit anim veniam minim aliqua.',
    },
  ],
  [
    'task4',
    {
      id: 'task4',
      title: 'Empty pond',
      status: 'done',
      due: '2022-10-01T00:00:00+12:00',
      completed: '2022-07-03T20:45:00+12:00',
      priority: 'low',
      description: 'Nisi mollit proident tempor commodo.',
    },
  ],
  [
    'task5',
    {
      id: 'task5',
      title: 'Build a fence',
      status: 'toDo',
      due: '2022-09-03T08:00:00+12:00',
      completed: null,
      priority: 'high',
      description:
        'Eiusmod cupidatat quis aute in consectetur cupidatat aute enim. Sunt minim esse elit incididunt laboris do nisi non cupidatat anim duis officia fugiat. Magna adipisicing dolor sint commodo nisi ut dolor ullamco labore nulla. Lorem proident quis dolore voluptate labore adipisicing consequat consequat aliquip minim consectetur minim. Id aliqua laborum commodo deserunt reprehenderit aliqua.\nSint nulla quis esse non exercitation aute officia.Quis magna veniam laboris pariatur aliqua eu sint labore ex exercitation veniam ex velit. Laboris ullamco esse consequat ipsum velit ex esse non. Officia reprehenderit labore ut ullamco magna mollit. Eiusmod dolor ea amet nostrud.',
    },
  ],
  [
    'task6',
    {
      id: 'task6',
      title: 'Fix the tractor',
      status: 'done',
      due: '2022-09-16T19:00:00+12:00',
      completed: '2022-08-21T19:00:00+12:00',
      priority: 'normal',
      description:
        'Ullamco duis et sunt culpa non est occaecat ex nulla reprehenderit id elit Lorem veniam.',
    },
  ],
  [
    'task7',
    {
      id: 'task7',
      title: 'Build a fence',
      status: 'toDo',
      due: '2022-11-02T21:40:00+12:00',
      completed: null,
      priority: 'high',
      description:
        'Commodo nulla ullamco dolore voluptate sit dolore. Exercitation occaecat sint est irure esse id amet consectetur id commodo. Reprehenderit consequat ipsum et do incididunt proident officia in. Ut dolor qui est pariatur reprehenderit incididunt minim. Tempor dolor dolor est est ea velit elit qui aliquip sit est enim id.',
    },
  ],
  [
    'task8',
    {
      id: 'task8',
      title: 'Dolor irure incididunt',
      status: 'done',
      due: '2022-05-18T14:22:00+12:00',
      completed: '2022-05-20T23:00:00+12:00',
      priority: 'low',
      description:
        'Et ut velit do deserunt proident culpa pariatur laboris ex est velit sunt. Minim eu occaecat quis incididunt non ad esse eu mollit culpa. Reprehenderit exercitation elit minim tempor. Eiusmod irure labore ullamco anim. Sint amet dolor fugiat sunt fugiat adipisicing.\n\nSint nulla eiusmod ad deserunt ullamco fugiat ipsum deserunt magna consectetur sint. Voluptate excepteur nisi incididunt nulla culpa voluptate laboris do non dolore quis ut nulla consequat. Irure reprehenderit eu sunt occaecat nulla labore. Consectetur consectetur nulla pariatur officia cupidatat consectetur.\n\nDeserunt sunt exercitation sint ipsum eiusmod consectetur. Do eiusmod nulla eu mollit do amet eiusmod in exercitation. Qui irure minim ullamco laboris est quis eu dolor id deserunt.\n\nEt ut velit do deserunt proident culpa pariatur laboris ex est velit sunt. Minim eu occaecat quis incididunt non ad esse eu mollit culpa. Reprehenderit exercitation elit minim tempor. Eiusmod irure labore ullamco anim. Sint amet dolor fugiat sunt fugiat adipisicing.\n\nSint nulla eiusmod ad deserunt ullamco fugiat ipsum deserunt magna consectetur sint. Voluptate excepteur nisi incididunt nulla culpa voluptate laboris do non dolore quis ut nulla consequat. Irure reprehenderit eu sunt occaecat nulla labore. Consectetur consectetur nulla pariatur officia cupidatat consectetur.\n\nDeserunt sunt exercitation sint ipsum eiusmod consectetur. Do eiusmod nulla eu mollit do amet eiusmod in exercitation. Qui irure minim ullamco laboris est quis eu dolor id deserunt.',
    },
  ],
  [
    'task9',
    {
      id: 'task9',
      title: 'Cupidatat duis ut eu',
      status: 'toDo',
      due: '2022-10-06T06:30:00+12:00',
      completed: null,
      priority: 'normal',
      description:
        'Reprehenderit est fugiat ipsum labore anim qui dolor mollit deserunt magna exercitation.',
    },
  ],
  [
    'task10',
    {
      id: 'task10',
      title: 'Proident duis',
      status: 'done',
      due: '2022-09-20T03:22:00+12:00',
      completed: '2022-08-15T11:00:00+12:00',
      priority: 'normal',
      description:
        'Adipisicing esse ut officia culpa fugiat eiusmod irure consectetur consectetur qui laborum. Fugiat consectetur minim ea enim. Fugiat consectetur ad excepteur id excepteur ipsum aliqua et. Nostrud ullamco aliquip ipsum id non proident. Qui proident culpa adipisicing laboris sint deserunt. Eu proident incididunt sunt sunt adipisicing consequat aliqua quis sint voluptate tempor fugiat commodo. Dolore mollit velit est duis.',
    },
  ],
];

export const taskMap: TaskMap = new Map(arrayForTaskMap);
