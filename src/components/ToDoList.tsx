import { css } from '@emotion/css';
import ToDo from './ToDo';

interface Props {
  todos: Array<any>;
  changeCompleted: (id: number) => void;
}

const listStyle = css({
  padding: 0,
  listStyleType: 'none',
});

const ToDoList = (props: Props) => {
  return (
    <ul className={listStyle}>
      {props.todos.map((todo, index) => (
        <ToDo
          id={todo.id}
          completed={todo.completed}
          toDoContent={todo.content}
          changeCompleted={props.changeCompleted}
          key={index}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
