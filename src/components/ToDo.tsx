import React from 'react';
import { css } from 'emotion';
import Checkmark from '../images/checkmark.svg';
import { mqMax } from '../util/constants';

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
  [mqMax[1]]: {
    fontSize: '16px',
  },
});

const labelStyle = css({
  wordBreak: 'break-all',
});

const customCheckboxStyle = (completed: boolean) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '24px',
    minHeight: '24px',
    marginRight: '15px',
    border: '2px solid black',
    borderRadius: '4px',
    backgroundColor: completed ? 'black' : 'white',
    cursor: 'pointer',
    [mqMax[1]]: {
      minWidth: '20px',
      minHeight: '20px',
    },
  });

const checkmarkStyle = (completed: boolean) =>
  css({
    display: completed ? 'block' : 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    [mqMax[1]]: {
      width: '12px',
    },
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
      <div className={labelStyle}>{props.toDoContent}</div>
    </li>
  );
};

export default ToDo;
