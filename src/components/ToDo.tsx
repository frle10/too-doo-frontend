import { css, cx } from '@emotion/css';
import Checkmark from '../images/checkmark.svg';
import { mqMax } from '../util/constants';
import { buttonReset } from '../util/styles';

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

const ToDo = ({ id, completed, toDoContent, changeCompleted }: Props) => {
  return (
    <li className={toDoStyle}>
      <button
        type='button'
        id={`todo${id}`}
        role='checkbox'
        aria-checked={completed}
        aria-label={toDoContent}
        className={cx([buttonReset, customCheckboxStyle(completed)])}
        onClick={() => changeCompleted(id)}
      >
        <img
          src={Checkmark}
          alt=''
          aria-hidden='true'
          className={checkmarkStyle(completed)}
        />
      </button>
      <div className={labelStyle}>{toDoContent}</div>
    </li>
  );
};

export default ToDo;
