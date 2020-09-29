import { css } from 'emotion';
import React from 'react';
import { ToDo } from './ToDo';

interface Props {
  toDos: Array<any>;
  changeCompleted: (index: number) => void;
}

const listStyle = css({
  padding: 0,
  listStyleType: 'none',
});

export const ToDoList = (props: Props) => {
  return (
    <ul className={listStyle}>
      {props.toDos.map((toDo, index) => (
        <ToDo
          id={index}
          completed={toDo.completed}
          toDoContent={toDo.content}
          changeCompleted={props.changeCompleted}
          key={index}
        />
      ))}
    </ul>
  );
};
