import React, { useState } from 'react';
import { css, cx } from 'emotion';
import Pen from '../images/pen.svg';

interface Props {
  toDoListName: string;
}

const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
});

const toDoListNameStyle = css({
  fontWeight: 900,
  fontSize: '32px',
  marginRight: '20px',
  outline: 'none',
  border: 'none',
});

const inputDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'block' : 'none',
    fontFamily: 'Inter',
    padding: 0,
  });

const nameDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'none' : 'block',
  });

const editButtonStyle = css({
  fontWeight: 'bold',
  color: '#777777',
  ':hover': {
    cursor: 'pointer',
  },
});

const penSvgStyle = css({
  marginRight: '5px',
});

const newListButtonStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #FFD976 0%, #F8BE26 100%)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100px',
  height: '43px',
  ':hover': {
    boxShadow: 'none',
    background: 'linear-gradient(90deg, #FFD976 0%, #F8BE26 100%)',
    cursor: 'pointer',
  },
});

export const Header = (props: Props) => {
  const [showInput, setShowInput] = useState(false);

  const focusInput = () => {
    const input = document.getElementById('toDoListName') as HTMLInputElement;
    setTimeout(() => input.focus(), 0);
  };

  return (
    <div className={headerStyle}>
      <div className={headerStyle}>
        <input
          type='text'
          id='toDoListName'
          className={cx([toDoListNameStyle, inputDisplayStyle(showInput)])}
          defaultValue={props.toDoListName}
          onBlur={() => setShowInput(false)}
        />
        <div className={cx([toDoListNameStyle, nameDisplayStyle(showInput)])}>
          {props.toDoListName}
        </div>
        <div
          className={editButtonStyle}
          onClick={() => {
            setShowInput(true);
            focusInput();
          }}
        >
          <img src={Pen} alt='Pen' className={penSvgStyle} /> Edit
        </div>
      </div>
      <div className={newListButtonStyle}>New List</div>
    </div>
  );
};
