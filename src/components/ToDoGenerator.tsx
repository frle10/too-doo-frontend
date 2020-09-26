import React from 'react';
import { css } from 'emotion';
import Plus from '../images/plus.svg';

const generatorStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

const inputStyle = css({
  width: '100%',
  height: '56px',
  borderRadius: '4px',
  outline: 'none',
  border: 'none',
  background: 'rgba(0, 0, 0, 0.05)',
  fontFamily: 'Inter',
  fontSize: '21px',
  color: 'rgba(0, 0, 0, 0.25)',
  padding: '0 50px',
  margin: '15px 0',
});

const plusStyle = css({
  position: 'absolute',
  padding: '0 20px',
  cursor: 'pointer',
});

export const ToDoGenerator = () => {
  return (
    <div className={generatorStyle}>
      <img src={Plus} alt='Plus' className={plusStyle} />
      <input type='text' className={inputStyle} placeholder='Add a to-do...' />
    </div>
  );
};
