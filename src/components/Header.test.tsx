import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { UNTITLED } from '../util/constants';

const renderHeader = (name = 'groceries') => {
  const changeName = vi.fn();
  const newList = vi.fn();
  render(<Header name={name} changeName={changeName} newList={newList} />);
  return { changeName, newList };
};

describe('Header', () => {
  it('shows the list name and focuses the input when editing starts', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: /rename list/i }));

    expect(screen.getByLabelText('List name')).toHaveFocus();
  });

  it('commits a new name on blur', async () => {
    const user = userEvent.setup();
    const { changeName } = renderHeader();

    await user.click(screen.getByRole('button', { name: /rename list/i }));
    const input = screen.getByLabelText('List name');
    await user.clear(input);
    await user.type(input, 'ragu shopping');
    await user.tab();

    expect(changeName).toHaveBeenCalledExactlyOnceWith('ragu shopping');
  });

  it('commits exactly once when the done button is used', async () => {
    const user = userEvent.setup();
    const { changeName } = renderHeader();

    await user.click(screen.getByRole('button', { name: /rename list/i }));
    const input = screen.getByLabelText('List name');
    await user.clear(input);
    await user.type(input, 'ragu shopping');
    await user.click(screen.getByRole('button', { name: /save list name/i }));

    expect(changeName).toHaveBeenCalledExactlyOnceWith('ragu shopping');
  });

  it(`falls back to "${UNTITLED}" when the name is cleared`, async () => {
    const user = userEvent.setup();
    const { changeName } = renderHeader();

    await user.click(screen.getByRole('button', { name: /rename list/i }));
    await user.clear(screen.getByLabelText('List name'));
    await user.tab();

    expect(changeName).toHaveBeenCalledExactlyOnceWith(UNTITLED);
  });

  it('caps the name at 25 characters', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: /rename list/i }));

    expect(screen.getByLabelText('List name')).toHaveAttribute(
      'maxlength',
      '25'
    );
  });

  it('starts a new list', async () => {
    const user = userEvent.setup();
    const { newList } = renderHeader();

    await user.click(screen.getByRole('button', { name: 'New List' }));

    expect(newList).toHaveBeenCalledOnce();
  });
});
