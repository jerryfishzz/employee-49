import { createResponseComposition, context } from 'msw';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(delay),
]);
