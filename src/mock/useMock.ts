import { useEffect, useState } from 'react';

import { server } from './native';

const { NODE_ENV, EXPO_PUBLIC_API_MOCKING } = process.env;

export function useMock() {
  const [mockLoaded, setMockLoaded] = useState<boolean>(false);

  const initMock = async () => {
    if (NODE_ENV === 'development' && EXPO_PUBLIC_API_MOCKING !== 'false') {
      server.listen();
    }

    setMockLoaded(true);
  };

  useEffect(() => {
    initMock();
  }, []);

  return [mockLoaded];
}
