import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoGenerator from './ToDoGenerator';

const renderGenerator = (succeeds = true) => {
  const addTodo = vi.fn().mockResolvedValue(succeeds);
  render(<ToDoGenerator addTodo={addTodo} />);
  return { addTodo, input: screen.getByLabelText('Add a to-do') };
};

describe('ToDoGenerator', () => {
  it('adds a to-do on Enter and clears the input', async () => {
    const user = userEvent.setup();
    const { addTodo, input } = renderGenerator();

    await user.type(input, 'thyme{Enter}');

    expect(addTodo).toHaveBeenCalledExactlyOnceWith('thyme');
    expect(input).toHaveValue('');
  });

  it('adds a to-do when the plus button is clicked', async () => {
    const user = userEvent.setup();
    const { addTodo, input } = renderGenerator();

    await user.type(input, 'thyme');
    await user.click(screen.getByRole('button', { name: 'Add to-do' }));

    expect(addTodo).toHaveBeenCalledExactlyOnceWith('thyme');
  });

  it('ignores an empty input', async () => {
    const user = userEvent.setup();
    const { addTodo } = renderGenerator();

    await user.click(screen.getByRole('button', { name: 'Add to-do' }));

    expect(addTodo).not.toHaveBeenCalled();
  });

  it('keeps the text when saving fails, so nothing is lost', async () => {
    const user = userEvent.setup();
    const { input } = renderGenerator(false);

    await user.type(input, 'thyme{Enter}');

    expect(input).toHaveValue('thyme');
  });
});
