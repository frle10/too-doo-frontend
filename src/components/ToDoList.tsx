import React from 'react';
import { ToDo } from './ToDo';

interface Props {
  toDos: Array<any>;
}

export const ToDoList = (props: Props) => {
  return (
    <div>
      {props.toDos.map((toDo, index) => (
        <ToDo
          id={index}
          completed={toDo.completed}
          toDoContent={toDo.content}
          key={index}
        />
      ))}
    </div>
  );
};
