import { render, screen, within } from 'src/utils/test-utils';
import { ToDo } from '../ToDo';

test('render ToDo', () => {
  render(<ToDo />);

  // screen.debug();

  const rows = screen.getAllByTestId('row-', { exact: false });

  expect(rows).toHaveLength(10);
  expect(within(rows[0]).getByText('Build a fence')).toBeOnTheScreen();
});
