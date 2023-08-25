import { render, screen, within } from 'src/utils/test-utils';
import { ToDo } from '../ToDo';

test('render ToDo', () => {
  render(<ToDo />);

  // screen.debug();

  const rows = screen.getAllByTestId('row-', { exact: false });

  expect(rows).toHaveLength(10);

  expect(within(rows[0]).getByText('Build a fence')).toBeOnTheScreen();
  expect(within(rows[1]).getByText('Fix the tractor')).toBeOnTheScreen();
  expect(within(rows[2]).getByText('Clean gumboots')).toBeOnTheScreen();
  expect(within(rows[3]).getByText('Empty pond')).toBeOnTheScreen();
  expect(within(rows[5]).getByText('Fix the computer')).toBeOnTheScreen();
  expect(within(rows[7]).getByText('Write a report')).toBeOnTheScreen();
  expect(within(rows[9]).getByText('Feed animals')).toBeOnTheScreen();
});
