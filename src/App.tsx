import { css } from '@emotion/css';
import ApplicationRouter from './ApplicationRouter';
import { mqMax } from './util/constants';

const app = css({
  padding: '0 20%',
  [mqMax[2]]: {
    padding: '0 10%',
  },
});

const App = () => {
  return (
    <div className={app}>
      <ApplicationRouter />
    </div>
  );
};

export default App;
