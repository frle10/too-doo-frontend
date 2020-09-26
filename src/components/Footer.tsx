import React from 'react';
import { css } from 'emotion';

const footerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.3)',
});

const separatorStyle = css({
  width: '100%',
  height: '1px',
  background: 'rgba(0, 0, 0, 0.1)',
  margin: '20px 0',
});

const footerHeaderStyle = css({
  fontWeight: 900,
  fontSize: '32px',
  margin: '5px 0',
});

export const Footer = () => {
  return (
    <div className={footerStyle}>
      <div className={separatorStyle}></div>
      <div className={footerHeaderStyle}>Too Doo</div>
      <div>Your to-dos have never been simpler.</div>
    </div>
  );
};
