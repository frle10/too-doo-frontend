import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoList from './ToDoList';
import type { Todo } from '../util/types';

const todos: Todo[] = [
  { id: 1, completed: false, content: '50g pancetta' },
  { id: 3, completed: true, content: 'extra-virgin olive oil' },
];

describe('ToDoList', () => {
  it('renders every to-do with its completion state', () => {
    render(<ToDoList todos={todos} changeCompleted={vi.fn()} />);

    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(
      screen.getByRole('checkbox', { name: '50g pancetta' })
    ).toHaveAttribute('aria-checked', 'false');
    expect(
      screen.getByRole('checkbox', { name: 'extra-virgin olive oil' })
    ).toHaveAttribute('aria-checked', 'true');
  });

  it('reports the id of the toggled to-do', async () => {
    const user = userEvent.setup();
    const changeCompleted = vi.fn();
    render(<ToDoList todos={todos} changeCompleted={changeCompleted} />);

    await user.click(screen.getByRole('checkbox', { name: '50g pancetta' }));

    expect(changeCompleted).toHaveBeenCalledExactlyOnceWith(1);
  });

  it('renders nothing for an empty list', () => {
    render(<ToDoList todos={[]} changeCompleted={vi.fn()} />);

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});
