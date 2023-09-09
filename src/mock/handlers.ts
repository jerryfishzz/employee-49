import { rest } from 'msw';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

const LOCAL_HOST = 'http://localhost:8081';
const REMOTE_SERVER = 'https://';

const { NODE_ENV, EXPO_PUBLIC_API_MOCKING } = process.env;
const hostUrl =
  NODE_ENV === 'test' ||
  (NODE_ENV === 'development' && EXPO_PUBLIC_API_MOCKING !== 'false')
    ? LOCAL_HOST
    : REMOTE_SERVER;

const handlers = [
  rest.get(`${hostUrl}`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'hello world!' }));
  }),
  rest.get(`${hostUrl}/done`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'done' }));
  }),
  rest.get(`${hostUrl}/detail`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'detail' }));
  }),
];

export { handlers };
