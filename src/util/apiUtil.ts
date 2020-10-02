import axios from 'axios';

export const callChangeName = (uuid: string | undefined, name: string) => {
  return axios.patch(`http://localhost:3000/todos/${uuid}`, { name });
};

export const callAddTodo = (uuid: string | undefined, content: string) => {
  return axios.post(`http://localhost:3000/todos/todo/${uuid}`, {
    content,
  });
};

export const callChangeCompleted = (id: number) => {
  return axios.patch(`http://localhost:3000/todos/todo/${id}`);
};
