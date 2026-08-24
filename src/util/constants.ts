import type { TodoList } from './types';

export const UNTITLED = 'untitled';
export const BACKEND_DOMAIN = import.meta.env.VITE_API_URL;

export const breakpoints = [350, 600, 1024, 2000];
export const mqMin = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
export const mqMax = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const emptyList: TodoList = {
  id: 1,
  uuid: '34f082e1-26b6-4bfb-a4db-7727ed05a27f',
  name: UNTITLED,
  todos: [],
};
