import { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import Pen from '../images/pen.svg';
import Done from '../images/done-icon.svg';
import { mqMax, UNTITLED } from '../util/constants';
import { buttonReset, newListButtonStyle } from '../util/styles';

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
  margin: '20px 0',
  maxHeight: '45px',
});

const toDoListNameStyle = css({
  boxSizing: 'border-box',
  fontWeight: 900,
  fontSize: '32px',
  outline: 'none',
  border: 'none',
});

const inputStyle = css({
  maxWidth: '400px',
  fontFamily: 'Inter',
  padding: '0 10px',
  border: '1px solid black',
  borderRadius: '4px',
  boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.75)',
  [mqMax[2]]: {
    fontSize: '26px',
    maxWidth: '300px',
  },
  [mqMax[1]]: {
    fontSize: '18px',
    maxWidth: '150px',
  },
  [mqMax[0]]: {
    fontSize: '16px',
    maxWidth: '100px',
  },
});

const divNameStyle = css({
  maxWidth: '500px',
  wordBreak: 'break-all',
  [mqMax[2]]: {
    fontSize: '26px',
    maxWidth: '300px',
  },
  [mqMax[1]]: {
    fontSize: '18px',
    maxWidth: '150px',
  },
  [mqMax[0]]: {
    fontSize: '16px',
    maxWidth: '100px',
  },
});

const nameDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'none' : 'flex',
  });

const inputDisplayStyle = (showInput: boolean) =>
  css({
    display: showInput ? 'inline' : 'none',
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
    fontSize: '12px',
    marginLeft: '10px',
  },
});

const penSvgStyle = css({
  marginRight: '5px',
  [mqMax[1]]: {
    width: '15px',
  },
});

const doneStyle = css({
  marginLeft: '20px',
  marginRight: '5px',
  cursor: 'pointer',
  [mqMax[1]]: {
    marginLeft: '10px',
  },
});

const Header = ({ name, changeName, newList }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setDraft(name);
    setShowInput(true);
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  const commit = () => {
    if (!showInput) {
      return;
    }

    // An empty name falls back to "untitled", matching the original behaviour.
    const next = draft ? draft : UNTITLED;
    setDraft(next);
    setShowInput(false);
    changeName(next);
  };

  return (
    <div className={headerStyle}>
      <div className={headerStyle}>
        <input
          ref={inputRef}
          type='text'
          id='toDoListName'
          aria-label='List name'
          maxLength={25}
          className={cx([
            toDoListNameStyle,
            inputStyle,
            inputDisplayStyle(showInput),
          ])}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
        />
        <button
          type='button'
          aria-label={`Rename list "${name}"`}
          className={cx([
            buttonReset,
            nameDisplayStyle(showInput),
            toDoListNameStyle,
            divNameStyle,
          ])}
          onClick={startEditing}
        >
          {name}
        </button>
        <button
          type='button'
          className={cx([
            buttonReset,
            nameDisplayStyle(showInput),
            editButtonStyle,
          ])}
          onClick={startEditing}
        >
          <img src={Pen} alt='' aria-hidden='true' className={penSvgStyle} />{' '}
          Edit
        </button>
        <button
          type='button'
          aria-label='Save list name'
          className={cx([buttonReset, inputDisplayStyle(showInput), doneStyle])}
          // Keep focus on the input so it does not blur-commit before onClick.
          onMouseDown={(e) => e.preventDefault()}
          onClick={commit}
        >
          <img src={Done} alt='' aria-hidden='true' />
        </button>
      </div>
      <button
        type='button'
        className={cx([buttonReset, newListButtonStyle])}
        onClick={newList}
      >
        New List
      </button>
    </div>
  );
};

export default Header;
