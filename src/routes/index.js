import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';
import { Error, Home } from './assembly'

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <h1><Link to='/home/1'>home01</Link></h1>
        <h1><Link to='/home/2'>home02</Link></h1>
        <Switch>
          {/* <Route path="/404" component={Error} /> */}
          <Route path="/home/:id" component={Home} />
        </Switch>
      </>
    </Router>
  )
}
