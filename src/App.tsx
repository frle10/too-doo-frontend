import { css } from '@emotion/css';
import Spinner from './components/Spinner';
import ApplicationRouter from './ApplicationRouter';
import { mqMax } from './util/constants';

const app = css({
  padding: '0 20%',
  [mqMax[2]]: {
    padding: '0 10%',
  },
});

const App = () => {
  const loading = false;

  return (
    <div className={app}>{loading ? <Spinner /> : <ApplicationRouter />}</div>
  );
};

export default App;
