import React from 'react';
import { css } from 'emotion';
import Checkmark from '../images/checkmark.svg';

interface Props {
  id: number;
  completed: boolean;
  toDoContent: string;
  changeCompleted: (id: number) => void;
}

const toDoStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '21px',
  margin: '25px 0',
  '& label': {
    marginLeft: '15px',
  },
});

const customCheckboxStyle = (completed: boolean) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    border: '2px solid black',
    borderRadius: '4px',
    backgroundColor: completed ? 'black' : 'white',
    cursor: 'pointer',
  });

const checkmarkStyle = (completed: boolean) =>
  css({
    display: completed ? 'block' : 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  });

const ToDo = (props: Props) => {
  return (
    <li className={toDoStyle}>
      <div
        id={`todo${props.id}`}
        className={customCheckboxStyle(props.completed)}
        onClick={() => props.changeCompleted(props.id)}
      >
        <img
          src={Checkmark}
          alt='Checkmark'
          className={checkmarkStyle(props.completed)}
        />
      </div>
      <label>{props.toDoContent}</label>
    </li>
  );
};

export default ToDo;
