import {
  createResponseComposition,
  context,
  RestContext,
  RestRequest,
  PathParams,
  ResponseComposition,
  DefaultBodyType,
} from 'msw';
import { z } from 'zod';

import { createZodErrorMessage, strToNum } from 'src/utils/helpers';

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
  return (
    data: string,
    processData: (data: string) => unknown | undefined,
    context: RestContext,
  ) => {
    const random = Math.floor(Math.random() * 9); // random number from 0 to 9
    console.log(random);
    return random >= zeroToTen
      ? processData(data) === undefined
        ? context.status(404)
        : context.json(processData(data))
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

interface CallbackRequest<TParams extends PathParams> extends RestRequest {
  params: TParams;
}

export function makeGetEndpoint<TParams extends PathParams>(
  paramsSchema: z.Schema<TParams> | null,
  callback: (
    req: CallbackRequest<TParams>,
    res: ResponseComposition,
    ctx: RestContext,
  ) => void,
) {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const params = paramsSchema ? { params: paramsSchema } : {};
    const schema = z.object(!paramsSchema ? {} : { ...(params as object) });
    const result = schema.safeParse(req);

    if (!result.success) {
      // No need to return message since axios will ignore it and use its own message
      const { issues } = result.error;
      return delayedResponse(ctx.status(400, createZodErrorMessage(issues)));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return callback(req as any, res, ctx);
  };
}
