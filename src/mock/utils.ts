import { createResponseComposition, context, RestContext } from 'msw';
import { strToNum } from 'src/utils/helpers';

const { NODE_ENV, EXPO_PUBLIC_MOCKING_DELAY } = process.env;

const delay =
  NODE_ENV === 'test'
    ? 0
    : EXPO_PUBLIC_MOCKING_DELAY
    ? strToNum(EXPO_PUBLIC_MOCKING_DELAY)
    : 500;

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(delay),
]);

export function createErrorChangeOnResponse(zeroToNine: number) {
  return (data: string, context: RestContext) => {
    const random = Math.floor(Math.random() * 9);
    console.log(random);
    return random > zeroToNine
      ? context.json(JSON.parse(data))
      : context.status(500);
  };
}
