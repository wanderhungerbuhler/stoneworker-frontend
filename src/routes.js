import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import Header from './Header';
import Register from './Register';
import ListWorkers from './ListWorkers';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route path="/register" component={Register} ></Route>
        <Route path="/filter" component={ListWorkers} ></Route>
      </Switch>
    </BrowserRouter>
  );
}
