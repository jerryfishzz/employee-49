import { faker } from '@faker-js/faker';
import { build, oneOf, perBuild } from '@jackfranklin/test-data-bot';

import { Task } from 'src/data/task.schema';
import { getCertainDate } from 'src/utils/helpers';

export const taskBuilder = build<Task>({
  fields: {
    id: perBuild(() => faker.string.uuid()),
    title: perBuild(() => faker.company.buzzPhrase()),
    status: oneOf('toDo', 'done'),
    due: perBuild(() =>
      faker.date
        .between({ from: getCertainDate(-7), to: getCertainDate(7) })
        .toISOString(),
    ),
    completed: oneOf(
      null,
      faker.date
        .between({ from: getCertainDate(-7), to: new Date() })
        .toISOString(),
    ),
    priority: oneOf('high', 'normal', 'low'),
    description: perBuild(() => faker.lorem.paragraph({ min: 1, max: 3 })),
  },
});

export function createFakeDataArray<T>(fakeBuilder: () => T, repeat: number) {
  const arr = [];

  for (let i = 0; i < repeat; i++) {
    arr.push(fakeBuilder());
  }

  return arr;
}
