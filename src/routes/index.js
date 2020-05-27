import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';
import { Tables } from './assembly'

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <Switch>
          <Route path="/" component={Tables} />
        </Switch>
      </>
    </Router>
  )
}
