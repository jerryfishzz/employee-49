import { useEffect, useState } from 'react';

import { server } from './native';
import { setUpDB } from './setUpDB';

const { NODE_ENV, EXPO_PUBLIC_API_MOCKING } = process.env;

export function useMock() {
  const [mockLoaded, setMockLoaded] = useState<boolean>(false);

  const initMock = async () => {
    try {
      if (NODE_ENV === 'development' && EXPO_PUBLIC_API_MOCKING !== 'false') {
        await setUpDB();

        // There are two post root requests on mobile, logs and symbolicate,
        // automatically created when the app starts.
        // Need to bypass them, otherwise, will cause infinite warnings.
        server.listen({ onUnhandledRequest: 'bypass' });
      }

      setMockLoaded(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    initMock();
  }, []);

  return [mockLoaded];
}
