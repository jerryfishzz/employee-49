import { rest } from 'msw';

import { HOST_URL } from 'src/data/host';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

const handlers = [
  rest.get(`${HOST_URL}`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'hello world!' }));
  }),
  rest.get(`${HOST_URL}/done`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'done' }));
  }),
  rest.get(`${HOST_URL}/detail/:id`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ message: 'detail' }));
  }),
];

export { handlers };
