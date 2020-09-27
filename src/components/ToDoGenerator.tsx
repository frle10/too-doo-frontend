import React from 'react';
import { css } from 'emotion';
import Plus from '../images/plus.svg';
import { toDoListExample } from '../assets/to-do-example';

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

export const ToDoGenerator = () => {
  const addToDo = () => {
    const generator = document.getElementById('generator') as HTMLInputElement;
    if (generator.value) {
      toDoListExample.todos.push({
        completed: false,
        content: generator.value,
      });
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
      />
    </div>
  );
};
