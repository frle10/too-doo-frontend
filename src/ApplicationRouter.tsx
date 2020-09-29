import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home';

const history = createBrowserHistory();

const ApplicationRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/:uuid?' component={Home} />
      </Switch>
    </Router>
  );
};

export default ApplicationRouter;
