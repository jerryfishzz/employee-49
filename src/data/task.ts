import { faker } from '@faker-js/faker';

import { Task, TaskMap } from '../context/task.schema';
import { getCertainDate } from 'src/utils/helpers';

const arrayForTaskMap: Array<[string, Task]> = [
  [
    'task1',
    {
      id: 'task1',
      title: 'Build a fence',
      status: 'toDo',
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      title: 'J Fix the tractor',
      status: 'toDo',
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
      completed: faker.date
        .between({ from: getCertainDate(-7), to: new Date() })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      title: 'Fix the computer',
      status: 'done',
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
      completed: faker.date
        .between({ from: getCertainDate(-7), to: new Date() })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
      completed: faker.date
        .between({ from: getCertainDate(-7), to: new Date() })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
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
      due: faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
      completed: faker.date
        .between({ from: getCertainDate(-7), to: new Date() })
        .toISOString(),
      priority: 'normal',
      description:
        "Around an hour after the crash, the Russian Federal Aviation Agency Rosaviatsiya released a statement confirming that Yevgeny Prigozhin's name was on the passenger manifest.",
    },
  ],
];

export const taskMap: TaskMap = new Map(arrayForTaskMap);
