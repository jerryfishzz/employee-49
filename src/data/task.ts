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
        "Wagner boss Yevgeny Prigozhin was on a plane that crashed in western Russia, according to the country's aviation authority.",
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
        'His name was on the list of those "declared as travelling on board" the plane, along with key Wagner commander Dmitry Utkin.',
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
        'The Russian Emergencies Ministry said that private aircraft "came down” near the village of Kuzhenkino - killing all on board.',
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
      description:
        'The ministry says the jet was flying from Moscow to St Petersburg, and that 10 people were on board.',
    },
  ],
  [
    'task5',
    {
      id: 'task5',
      title: 'Clean the floor',
      status: 'toDo',
      due: '2022-09-03T08:00:00+12:00',
      completed: null,
      priority: 'high',
      description:
        'Ten bodies have been found at the crash site, according to state media.',
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
        'Prigozhin has been keeping a low public profile since heading his short-lived mutiny in June, which lasted only 24 hours.',
    },
  ],
  [
    'task7',
    {
      id: 'task7',
      title: 'Buy some tools',
      status: 'toDo',
      due: '2022-11-02T21:40:00+12:00',
      completed: null,
      priority: 'high',
      description:
        'He last appeared in a video earlier this week which was said to have been filmed in an unspecified location in Africa.',
    },
  ],
  [
    'task8',
    {
      id: 'task8',
      title: 'Write a report',
      status: 'done',
      due: '2022-05-18T14:22:00+12:00',
      completed: '2022-05-20T23:00:00+12:00',
      priority: 'low',
      description:
        'The Wagner mercenary group was founded in 2014 and was highly active in the Ukraine war until the June mutiny.',
    },
  ],
  [
    'task9',
    {
      id: 'task9',
      title: 'Mow the lawn',
      status: 'toDo',
      due: '2022-10-06T06:30:00+12:00',
      completed: null,
      priority: 'normal',
      description: 'Russia is a country full of surprises.',
    },
  ],
  [
    'task10',
    {
      id: 'task10',
      title: 'Feed animals',
      status: 'done',
      due: '2022-09-20T03:22:00+12:00',
      completed: '2022-08-15T11:00:00+12:00',
      priority: 'normal',
      description:
        "Around an hour after the crash, the Russian Federal Aviation Agency Rosaviatsiya released a statement confirming that Yevgeny Prigozhin's name was on the passenger manifest.",
    },
  ],
];

export const taskMap: TaskMap = new Map(arrayForTaskMap);
