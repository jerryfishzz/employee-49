import { render } from 'src/utils/test-utils';
import { ToDo } from '../ToDo';

test('render ToDo', () => {
  render(<ToDo />);

  // const searchBar = screen.queryByPlaceholderText(/search/i);

  // expect(searchBar).not.toBeNull();
});
