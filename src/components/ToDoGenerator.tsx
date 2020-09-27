import React, { KeyboardEvent } from 'react';
import { css } from 'emotion';
import Plus from '../images/plus.svg';

interface Props {
  addToDo: (toDo: any) => void;
}

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
  margin: '0 20px',
  cursor: 'pointer',
});

export const ToDoGenerator = (props: Props) => {
  const addToDo = () => {
    const generator = document.getElementById('generator') as HTMLInputElement;
    if (generator.value) {
      props.addToDo({
        completed: false,
        content: generator.value,
      });
    }
  };

  const detectEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addToDo();
    }
  };

  return (
    <div className={generatorStyle}>
      <img src={Plus} alt='Plus' className={plusStyle} onClick={addToDo} />
      <input
        type='text'
        id='generator'
        className={inputStyle}
        placeholder='Add a to-do...'
        onKeyPress={detectEnter}
      />
    </div>
  );
};
