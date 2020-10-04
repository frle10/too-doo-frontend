import React, { KeyboardEvent, useState } from 'react';
import { css, cx } from 'emotion';
import { makeEditable, validateNameChange } from '../util/headerUtil';
import Pen from '../images/pen.svg';
import Done from '../images/done-icon.svg';
import { mqMax } from '../util/constants';

interface Props {
  name: string;
  changeName: (name: string) => void;
  newList: () => void;
}

const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
  minHeight: '35px',
});

const toDoListNameStyle = css({
  boxSizing: 'border-box',
  fontWeight: 900,
  fontSize: '32px',
  outline: 'none',
  border: 'none',
});

const inputStyle = css({
  fontFamily: 'Inter',
  padding: '0 10px',
  border: '1px solid black',
  borderRadius: '4px',
  boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.75)',
  margin: '-1px 0',
  height: '35px',
  [mqMax[2]]: {
    fontSize: '26px',
    width: '400px',
  },
  [mqMax[1]]: {
    fontSize: '18px',
    width: '150px',
  },
  [mqMax[0]]: {
    fontSize: '16px',
    width: '100px',
  },
});

const divNameStyle = css({
  width: '500px',
  wordBreak: 'break-all',
  [mqMax[2]]: {
    fontSize: '26px',
    width: '400px',
  },
  [mqMax[1]]: {
    fontSize: '18px',
    width: '150px',
  },
  [mqMax[0]]: {
    fontSize: '16px',
    width: '100px',
  },
});

const nameDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'none' : 'flex',
  });

const inputDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'block' : 'none',
  });

const editButtonStyle = css({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  marginLeft: '20px',
  marginRight: '5px',
  color: '#777777',
  ':hover': {
    cursor: 'pointer',
  },
  [mqMax[1]]: {
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '12px',
    marginLeft: '5px',
  },
});

const penSvgStyle = css({
  marginRight: '5px',
  [mqMax[1]]: {
    width: '15px',
    marginRight: '0',
    marginBottom: '5px',
  },
});

const doneStyle = css({
  marginLeft: '20px',
  cursor: 'pointer',
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
  minWidth: '100px',
  minHeight: '43px',
  ':hover': {
    boxShadow: 'none',
    background: 'linear-gradient(90deg, #FFD976 0%, #F8BE26 100%)',
    cursor: 'pointer',
  },
  [mqMax[1]]: {
    fontSize: '12px',
    minWidth: '70px',
    minHeight: '40px',
  },
});

const Header = (props: Props) => {
  const [showInput, setShowInput] = useState(false);

  const detectEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateNameChange(setShowInput, props.changeName);
    }
  };

  return (
    <div className={headerStyle}>
      <div className={headerStyle}>
        <input
          type='text'
          id='toDoListName'
          maxLength={25}
          className={cx([
            toDoListNameStyle,
            inputStyle,
            inputDisplayStyle(showInput),
          ])}
          defaultValue={props.name}
          onBlur={() => validateNameChange(setShowInput, props.changeName)}
          onKeyPress={detectEnter}
        />
        <div
          className={cx([
            nameDisplayStyle(showInput),
            toDoListNameStyle,
            divNameStyle,
          ])}
          onClick={() => makeEditable(setShowInput)}
        >
          {props.name}
        </div>
        <div
          className={cx([nameDisplayStyle(showInput), editButtonStyle])}
          onClick={() => makeEditable(setShowInput)}
        >
          <img src={Pen} alt='Pen' className={penSvgStyle} /> Edit
        </div>
        <div
          className={cx([inputDisplayStyle(showInput), doneStyle])}
          onClick={() => validateNameChange(setShowInput, props.changeName)}
        >
          <img src={Done} alt='Done' />
        </div>
      </div>
      <div className={newListButtonStyle} onClick={() => props.newList()}>
        New List
      </div>
    </div>
  );
};

export default Header;
