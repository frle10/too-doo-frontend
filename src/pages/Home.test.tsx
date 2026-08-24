import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import type { Todo, TodoList } from '../util/types';

const {
  callGetTodoList,
  callChangeName,
  callAddTodo,
  callChangeCompleted,
  ApiError,
} = vi.hoisted(() => {
  class ApiError extends Error {
    constructor(
      message: string,
      readonly status?: number
    ) {
      super(message);
    }
  }
  return {
    callGetTodoList: vi.fn(),
    callChangeName: vi.fn(),
    callAddTodo: vi.fn(),
    callChangeCompleted: vi.fn(),
    ApiError,
  };
});

vi.mock('../util/apiUtil', () => ({
  ApiError,
  callGetTodoList,
  callChangeName,
  callAddTodo,
  callChangeCompleted,
}));

const UUID = '34f082e1-26b6-4bfb-a4db-7727ed05a27f';

const list = (todos: Todo[] = [], name = 'ragu shopping'): TodoList => ({
  id: 1,
  uuid: UUID,
  name,
  todos,
});

const LocationProbe = () => (
  <div data-testid='pathname'>{useLocation().pathname}</div>
);

const pathname = () => screen.getByTestId('pathname').textContent;

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LocationProbe />
      <Routes>
        <Route path='/NotFound' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/:uuid' element={<Home />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Home', () => {
  it('loads and renders the list named in the url', async () => {
    callGetTodoList.mockResolvedValue(
      list([{ id: 1, completed: false, content: '50g pancetta' }])
    );

    renderAt(`/${UUID}`);

    expect(await screen.findByText('50g pancetta')).toBeInTheDocument();
    expect(callGetTodoList).toHaveBeenCalledExactlyOnceWith(UUID);
  });

  it('redirects a malformed uuid back to the home page without calling the api', async () => {
    renderAt('/not-a-uuid');

    await waitFor(() => expect(pathname()).toBe('/'));
    expect(callGetTodoList).not.toHaveBeenCalled();
  });

  it('routes to NotFound when the list does not exist', async () => {
    callGetTodoList.mockResolvedValue(null);

    renderAt(`/${UUID}`);

    expect(await screen.findByText(/does not exist/i)).toBeInTheDocument();
    expect(pathname()).toBe('/NotFound');
  });

  it('does not call the api for a fresh list', async () => {
    renderAt('/');

    expect(await screen.findByLabelText('Add a to-do')).toBeInTheDocument();
    expect(callGetTodoList).not.toHaveBeenCalled();
  });

  it('toggles completion without mutating the previous state', async () => {
    const original: Todo = { id: 1, completed: false, content: '50g pancetta' };
    callGetTodoList.mockResolvedValue(list([original]));
    callChangeCompleted.mockResolvedValue({ ...original, completed: true });

    const user = userEvent.setup();
    renderAt(`/${UUID}`);

    await user.click(
      await screen.findByRole('checkbox', { name: '50g pancetta' })
    );

    await waitFor(() =>
      expect(
        screen.getByRole('checkbox', { name: '50g pancetta' })
      ).toHaveAttribute('aria-checked', 'true')
    );
    // The object handed to us by the api layer must never be edited in place.
    expect(original.completed).toBe(false);
  });

  it('reuses one uuid when a rename and an add race on a fresh list', async () => {
    callChangeName.mockImplementation((_uuid: string, name: string) =>
      Promise.resolve(list([], name))
    );
    callAddTodo.mockResolvedValue({
      id: 9,
      completed: false,
      content: 'thyme',
    });

    const user = userEvent.setup();
    renderAt('/');

    await user.click(screen.getByRole('button', { name: /rename list/i }));
    const nameInput = screen.getByLabelText('List name');
    await user.clear(nameInput);
    await user.type(nameInput, 'ragu shopping');
    await user.tab();

    await user.type(screen.getByLabelText('Add a to-do'), 'thyme{Enter}');

    await waitFor(() => expect(callAddTodo).toHaveBeenCalled());

    const renamedUuid = callChangeName.mock.calls[0][0] as string;
    const addedUuid = callAddTodo.mock.calls[0][0] as string;
    expect(addedUuid).toBe(renamedUuid);
    expect(pathname()).toBe(`/${renamedUuid}`);
  });

  it('surfaces an api failure instead of failing silently', async () => {
    callGetTodoList.mockRejectedValue(
      new ApiError('Could not reach the server.')
    );

    renderAt(`/${UUID}`);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not reach the server.'
    );
  });
});
