import React from 'react';
import { css } from 'emotion';
import Home from './pages/Home';
import Spinner from './components/Spinner';

const app = css({
  padding: '0 20%',
});

function App() {
  const loading = false;

  return <div className={app}>{loading ? <Spinner /> : <Home />}</div>;
}

export default App;
