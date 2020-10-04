import { css, cx } from 'emotion';
import React from 'react';
import { Link } from 'react-router-dom';
import { newListButtonStyle } from '../components/Header';

const notFoundStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const errorMessageStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
});

const homeButtonStyle = newListButtonStyle;

const buttonDisplayStyle = css({
  width: '100px',
  '& a': {
    textDecoration: 'none',
    ':visited': {
      color: 'black',
    },
  },
});

const NotFound = () => {
  return (
    <div className={notFoundStyle}>
      <div className={errorMessageStyle}>
        The list with the specified UUID does not exist. :/
      </div>
      <div className={cx([homeButtonStyle, buttonDisplayStyle])}>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
