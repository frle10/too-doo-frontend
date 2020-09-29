import React from 'react';
import { css } from 'emotion';
import Spinner from './components/Spinner';
import ApplicationRouter from './ApplicationRouter';

const app = css({
  padding: '0 20%',
});

function App() {
  const loading = false;

  return (
    <div className={app}>{loading ? <Spinner /> : <ApplicationRouter />}</div>
  );
}

export default App;
