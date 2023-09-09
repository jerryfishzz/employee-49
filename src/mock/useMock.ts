import { useEffect, useState } from 'react';

import { server } from './native';

const { NODE_ENV, EXPO_PUBLIC_API_MOCKING } = process.env;

export function useMock() {
  const [mockLoaded, setMockLoaded] = useState<boolean>(false);

  const initMock = async () => {
    if (NODE_ENV === 'development' && EXPO_PUBLIC_API_MOCKING !== 'false') {
      // There are two post root requests on mobile, logs and symbolicate,
      // automatically created when the app starts.
      // Need to bypass them, otherwise, will cause infinite warnings.
      server.listen({ onUnhandledRequest: 'bypass' });
    }

    setMockLoaded(true);
  };

  useEffect(() => {
    initMock();
  }, []);

  return [mockLoaded];
}
