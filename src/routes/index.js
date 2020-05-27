import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { Error, Home, Tables } from './assembly'

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <Switch>
          <Route path="/404" component={Error} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Tables} />
        </Switch>
      </>
    </Router>
  )
}
