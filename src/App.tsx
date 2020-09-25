import React from 'react';
import Spinner from './components/Spinner';
import Home from './pages/Home';

function App() {
  const loading = false;

  return <div>{loading ? <Spinner /> : <Home />}</div>;
}

export default App;
