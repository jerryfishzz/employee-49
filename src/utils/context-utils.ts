import { createContext, useContext } from 'react';

function customCreateContext<A extends unknown | null>(
  providerName: string,
  displayName?: string,
) {
  const ctx = createContext<A | undefined>(undefined);

  if (ctx && displayName) {
    ctx.displayName = displayName;
  }

  function useCtx(componentName: string = 'Consumer components') {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error(
        `${componentName} must be inside ${providerName} with a value`,
      );
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export { customCreateContext as createContext };
