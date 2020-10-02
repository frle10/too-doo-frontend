import { TodoList } from './types';

export const UNTITLED = 'untitled';

export const toDoListExample: TodoList = {
  id: 1,
  uuid: '34f082e1-26b6-4bfb-a4db-7727ed05a27f',
  name: 'ragu shopping',
  todos: [
    {
      id: 1,
      completed: false,
      content: '50g pancetta',
    },
    {
      id: 2,
      completed: false,
      content: 'thyme',
    },
    {
      id: 3,
      completed: true,
      content: 'extra-virgin olive oil',
    },
    {
      id: 4,
      completed: false,
      content: 'Pecorino cheese 💖',
    },
    {
      id: 5,
      completed: false,
      content: 'yellow onions',
    },
    {
      id: 6,
      completed: true,
      content: 'tomatoes',
    },
    {
      id: 7,
      completed: false,
      content: 'black peppers',
    },
  ],
};

export const emptyList: TodoList = {
  id: 1,
  uuid: '34f082e1-26b6-4bfb-a4db-7727ed05a27f',
  name: UNTITLED,
  todos: [],
};
