import { css } from '@emotion/css';
import { mqMax } from './constants';

/**
 * Strips the user-agent button styling so a <button> renders exactly like the
 * <div> it replaced. Always list this first in `cx(...)` so the component's own
 * styles win where they overlap.
 */
export const buttonReset = css({
  appearance: 'none',
  // Browsers default <button> to border-box; a <div> is content-box, and the
  // sizes in this design were all authored against content-box.
  boxSizing: 'content-box',
  background: 'none',
  border: 'none',
  borderRadius: 0,
  padding: 0,
  margin: 0,
  font: 'inherit',
  color: 'inherit',
  textAlign: 'inherit',
  lineHeight: 'inherit',
});

/** Shared by the header's New List button and the NotFound page's Home link. */
export const newListButtonStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #FFD976 0%, #F8BE26 100%)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  minWidth: '100px',
  minHeight: '43px',
  ':hover': {
    boxShadow: 'none',
    background: 'linear-gradient(90deg, #FFD976 0%, #F8BE26 100%)',
    cursor: 'pointer',
  },
  [mqMax[1]]: {
    fontSize: '12px',
    minWidth: '70px',
  },
});
