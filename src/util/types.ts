export interface TodoList {
  id: number;
  uuid: string;
  name: string;
  todos: Array<Todo>;
}

export interface Todo {
  id: number;
  completed: boolean;
  content: string;
}
