import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { css, cx } from '@emotion/css';
import Plus from '../images/plus.svg';
import { mqMax } from '../util/constants';
import { buttonReset } from '../util/styles';

interface Props {
  /** Resolves to `true` when the to-do was stored, which clears the input. */
  addTodo: (content: string) => Promise<boolean>;
}

const generatorStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
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
  padding: '0 50px',
  margin: '15px 0',
  [mqMax[1]]: {
    height: '48px',
    fontSize: '16px',
  },
});

const plusStyle = css({
  position: 'absolute',
  margin: '0 20px',
  cursor: 'pointer',
  display: 'flex',
});

const ToDoGenerator = ({ addTodo }: Props) => {
  const [content, setContent] = useState('');

  const submit = async () => {
    if (!content) {
      return;
    }

    if (await addTodo(content)) {
      setContent('');
    }
  };

  const detectEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      void submit();
    }
  };

  return (
    <div className={generatorStyle}>
      <button
        type='button'
        aria-label='Add to-do'
        className={cx([buttonReset, plusStyle])}
        onClick={() => void submit()}
      >
        <img src={Plus} alt='' aria-hidden='true' />
      </button>
      <input
        type='text'
        aria-label='Add a to-do'
        className={inputStyle}
        placeholder='Add a to-do...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={detectEnter}
      />
    </div>
  );
};

export default ToDoGenerator;
