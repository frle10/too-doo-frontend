import axios from 'axios';
import { BACKEND_DOMAIN } from './constants';

export const callChangeName = (uuid: string | undefined, name: string) => {
  return axios.patch(`${BACKEND_DOMAIN}/todos/${uuid}`, { name });
};

export const callAddTodo = (uuid: string | undefined, content: string) => {
  return axios.post(`${BACKEND_DOMAIN}/todos/todo/${uuid}`, {
    content,
  });
};

export const callChangeCompleted = (id: number) => {
  return axios.patch(`${BACKEND_DOMAIN}/todos/todo/${id}`);
};
