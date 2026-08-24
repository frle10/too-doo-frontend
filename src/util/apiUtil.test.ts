import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ApiError,
  callAddTodo,
  callChangeCompleted,
  callChangeName,
  callGetTodoList,
} from './apiUtil';
import { BACKEND_DOMAIN } from './constants';
import type { Todo, TodoList } from './types';

// This is the one module that owns `fetch`, so it is the one place where
// stubbing the global is the right seam. Everywhere else, mock `util/apiUtil`.
const fetchMock = vi.fn<typeof fetch>();

const UUID = '34f082e1-26b6-4bfb-a4db-7727ed05a27f';

const list: TodoList = {
  id: 1,
  uuid: UUID,
  name: 'ragu shopping',
  todos: [],
};

const todo: Todo = { id: 9, completed: false, content: 'thyme' };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('callGetTodoList', () => {
  it('parses the list the backend returns', async () => {
    fetchMock.mockResolvedValue(json(list));

    await expect(callGetTodoList(UUID)).resolves.toEqual(list);
    expect(fetchMock).toHaveBeenCalledWith(`${BACKEND_DOMAIN}/todos/${UUID}`, {
      method: 'GET',
      headers: undefined,
      body: undefined,
    });
  });

  it('resolves to null on an empty 200 body, which is how the backend says "no such list"', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }));

    await expect(callGetTodoList(UUID)).resolves.toBeNull();
  });

  it('resolves to null on 404', async () => {
    fetchMock.mockResolvedValue(new Response('Not Found', { status: 404 }));

    await expect(callGetTodoList(UUID)).resolves.toBeNull();
  });

  it('throws an ApiError carrying the status on a failure response', async () => {
    fetchMock.mockResolvedValue(new Response('boom', { status: 500 }));

    await expect(callGetTodoList(UUID)).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Request failed with status 500',
      status: 500,
    });
    await expect(callGetTodoList(UUID)).rejects.toBeInstanceOf(ApiError);
  });

  it('turns a network failure into a readable ApiError rather than a raw TypeError', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(callGetTodoList(UUID)).rejects.toThrow(
      'Could not reach the server. Please try again.'
    );
  });
});

describe('callChangeName', () => {
  it('sends the name as json and returns the updated list', async () => {
    fetchMock.mockResolvedValue(json(list));

    await expect(callChangeName(UUID, 'ragu shopping')).resolves.toEqual(list);
    expect(fetchMock).toHaveBeenCalledWith(`${BACKEND_DOMAIN}/todos/${UUID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ragu shopping' }),
    });
  });

  it('throws when the backend answers with no body where a list is required', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }));

    await expect(callChangeName(UUID, 'ragu shopping')).rejects.toThrow(
      'The server returned no list.'
    );
  });
});

describe('callAddTodo', () => {
  it('posts the content and returns the created to-do', async () => {
    fetchMock.mockResolvedValue(json(todo, 201));

    await expect(callAddTodo(UUID, 'thyme')).resolves.toEqual(todo);
    expect(fetchMock).toHaveBeenCalledWith(
      `${BACKEND_DOMAIN}/todos/todo/${UUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'thyme' }),
      }
    );
  });

  it('throws when the backend answers with no body', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }));

    await expect(callAddTodo(UUID, 'thyme')).rejects.toThrow(
      'The server returned no to-do.'
    );
  });
});

describe('callChangeCompleted', () => {
  it('patches by numeric to-do id and sends no json headers', async () => {
    fetchMock.mockResolvedValue(json({ ...todo, completed: true }));

    await expect(callChangeCompleted(9)).resolves.toEqual({
      ...todo,
      completed: true,
    });
    expect(fetchMock).toHaveBeenCalledWith(`${BACKEND_DOMAIN}/todos/todo/9`, {
      method: 'PATCH',
      headers: undefined,
      body: undefined,
    });
  });

  it('throws when the backend answers with no body', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }));

    await expect(callChangeCompleted(9)).rejects.toThrow(
      'The server returned no to-do.'
    );
  });
});
