import { createContext } from 'src/utils/context-utils';

const [useRow, rowContext] = createContext('<Row />', 'Row');

export { useRow, rowContext };
