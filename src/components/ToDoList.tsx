import { css } from '@emotion/css';
import ToDo from './ToDo';
import type { Todo } from '../util/types';

interface Props {
  todos: Todo[];
  changeCompleted: (id: number) => void;
}

const listStyle = css({
  padding: 0,
  listStyleType: 'none',
});

const ToDoList = ({ todos, changeCompleted }: Props) => {
  return (
    <ul className={listStyle}>
      {todos.map((todo) => (
        <ToDo
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          toDoContent={todo.content}
          changeCompleted={changeCompleted}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
