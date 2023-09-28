import { createResponseComposition, context, RestContext } from 'msw';
import { strToNum } from 'src/utils/helpers';

const { NODE_ENV, EXPO_PUBLIC_MOCKING_DELAY } = process.env;

const delay =
  NODE_ENV === 'test'
    ? 0
    : EXPO_PUBLIC_MOCKING_DELAY
    ? strToNum(EXPO_PUBLIC_MOCKING_DELAY)
    : 0;

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(delay),
]);

// Return response with a chance of the server error 500
export function createErrorChangeOnResponse(zeroToTen: number) {
  return (data: string, context: RestContext) => {
    const random = Math.floor(Math.random() * 9); // random number from 0 to 9
    console.log(random);
    return random >= zeroToTen
      ? context.json(JSON.parse(data))
      : context.status(500);
  };
}

export function arrayToMap<T extends object>(
  arr: T[],
  handler: keyof T,
): Map<string, T> {
  const mapReadyArray = arr.map(
    (item) => [item[handler] as string, item] as const,
  );
  return new Map(mapReadyArray);
}
