import { createResponseComposition, context, RestContext } from 'msw';

const delay = process.env.NODE_ENV === 'test' ? 0 : 500;

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
