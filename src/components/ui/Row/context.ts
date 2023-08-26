import { createContext } from 'src/utils/context-utils';

const [useRow, RowProvider] = createContext('<RowProvider>', 'RowProvider');

export { useRow, RowProvider };
