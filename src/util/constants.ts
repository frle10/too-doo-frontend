import type { ListView } from './types';

export const UNTITLED = 'untitled';
export const BACKEND_DOMAIN = import.meta.env.VITE_API_URL;

export const breakpoints = [350, 600, 1024, 2000];
export const mqMin = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
export const mqMax = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const emptyList: ListView = {
  name: UNTITLED,
  todos: [],
};
