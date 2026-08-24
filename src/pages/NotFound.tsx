import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';
import { newListButtonStyle } from '../util/styles';

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

// Applied to the <a> itself rather than to a wrapper, so the whole button is a
// click target instead of only the text inside it.
const homeLinkStyle = css({
  width: '100px',
  textDecoration: 'none',
  color: 'black',
  ':visited': {
    color: 'black',
  },
});

const NotFound = () => {
  return (
    <div className={notFoundStyle}>
      <div className={errorMessageStyle}>
        The list with the specified UUID does not exist. :/
      </div>
      <Link to='/' className={cx([newListButtonStyle, homeLinkStyle])}>
        Home
      </Link>
    </div>
  );
};

export default NotFound;
