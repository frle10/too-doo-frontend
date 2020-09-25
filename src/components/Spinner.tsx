import React from 'react';
import { css } from 'emotion';
import SpinnerGif from '../images/spinner.gif';

const spinnerStyle = css({
  display: 'flex',
  width: '15%',
  margin: 'auto',
});

const Spinner = () => {
  return (
    <>
      <img src={SpinnerGif} alt='Loading...' className={spinnerStyle} />
    </>
  );
};

export default Spinner;
