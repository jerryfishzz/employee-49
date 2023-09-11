const LOCAL_HOST = 'http://localhost:8081';
const REMOTE_SERVER = 'https://';

const { NODE_ENV, EXPO_PUBLIC_API_MOCKING } = process.env;
export const HOST_URL =
  NODE_ENV === 'test' ||
  (NODE_ENV === 'development' && EXPO_PUBLIC_API_MOCKING !== 'false')
    ? LOCAL_HOST
    : REMOTE_SERVER;
