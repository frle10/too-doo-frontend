export interface TodoList {
  id: number;
  uuid: string;
  name: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  completed: boolean;
  content: string;
}

/**
 * What the UI actually renders. A list that has not been persisted yet has no
 * server-assigned `id` or `uuid`, so the view type deliberately omits them
 * rather than inventing placeholders.
 */
export type ListView = Pick<TodoList, 'name' | 'todos'>;
