import { faker } from '@faker-js/faker';
import { build, oneOf, perBuild } from '@jackfranklin/test-data-bot';

import { getCertainDate } from 'src/utils/helpers';
import { Task } from 'src/utils/schema';

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
    description: perBuild(() =>
      faker.lorem.paragraphs({ min: 1, max: 5 }, '\n'),
    ),
  },
});

export function createFakeDataArray<T>(fakeBuilder: () => T, repeat: number) {
  const arr = [];

  for (let i = 0; i < repeat; i++) {
    arr.push(fakeBuilder());
  }

  return arr;
}
