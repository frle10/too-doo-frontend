import { css } from '@emotion/css';
import { mqMax } from '../util/constants';

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
  [mqMax[1]]: {
    fontSize: '24px',
  },
});

const footerContentStyle = css({
  marginBottom: '20px',
  [mqMax[1]]: {
    fontSize: '14px',
  },
});

const Footer = () => {
  return (
    <div className={footerStyle}>
      <div className={separatorStyle}></div>
      <div className={footerHeaderStyle}>Too Doo</div>
      <div className={footerContentStyle}>
        Your to-dos have never been simpler.
      </div>
    </div>
  );
};

export default Footer;
