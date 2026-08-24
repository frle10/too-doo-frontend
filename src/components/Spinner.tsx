import { css, keyframes } from '@emotion/css';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const spinnerStyle = css({
  display: 'block',
  width: '48px',
  height: '48px',
  margin: '80px auto',
  borderRadius: '50%',
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTopColor: '#F8BE26',
  animation: `${spin} 0.8s linear infinite`,
  '@media (prefers-reduced-motion: reduce)': {
    animationDuration: '2s',
  },
});

const Spinner = () => {
  return <div className={spinnerStyle} role='status' aria-label='Loading' />;
};

export default Spinner;
