import { BACKEND_DOMAIN } from './constants';
import type { Todo, TodoList } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH';
  body?: unknown;
}

/**
 * Resolves to `null` when the backend answers with an empty body, which is how
 * it reports "no such list" (see TodoListRepository.getTodoList in the backend
 * repo — it returns undefined, and Nest serialises that as 200 + empty body).
 */
const request = async <T>(
  path: string,
  { method = 'GET', body }: RequestOptions = {}
): Promise<T | null> => {
  let response: Response;

  try {
    response = await fetch(`${BACKEND_DOMAIN}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Could not reach the server. Please try again.');
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status
    );
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
};

/** Throws when the backend answers with no content where content is required. */
const requireBody = async <T>(
  result: Promise<T | null>,
  what: string
): Promise<T> => {
  const value = await result;
  if (value === null) {
    throw new ApiError(`The server returned no ${what}.`);
  }
  return value;
};

/** Resolves to `null` when no list exists for the given uuid. */
export const callGetTodoList = (uuid: string): Promise<TodoList | null> =>
  request<TodoList>(`/todos/${uuid}`);

export const callChangeName = (uuid: string, name: string): Promise<TodoList> =>
  requireBody(
    request<TodoList>(`/todos/${uuid}`, { method: 'PATCH', body: { name } }),
    'list'
  );

export const callAddTodo = (uuid: string, content: string): Promise<Todo> =>
  requireBody(
    request<Todo>(`/todos/todo/${uuid}`, { method: 'POST', body: { content } }),
    'to-do'
  );

export const callChangeCompleted = (id: number): Promise<Todo> =>
  requireBody(request<Todo>(`/todos/todo/${id}`, { method: 'PATCH' }), 'to-do');
