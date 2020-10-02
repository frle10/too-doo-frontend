import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const history = createBrowserHistory();

const ApplicationRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/NotFound' component={NotFound} />
        <Route path='/:uuid?' component={Home} />
      </Switch>
    </Router>
  );
};

export default ApplicationRouter;
