import { css } from 'emotion';
import React from 'react';
import { ToDo } from './ToDo';

interface Props {
  todos: Array<any>;
  changeCompleted: (index: number) => void;
}

const listStyle = css({
  padding: 0,
  listStyleType: 'none',
});

export const ToDoList = (props: Props) => {
  return (
    <ul className={listStyle}>
      {props.todos.map((todo, index) => (
        <ToDo
          id={index}
          completed={todo.completed}
          toDoContent={todo.content}
          changeCompleted={props.changeCompleted}
          key={index}
        />
      ))}
    </ul>
  );
};
