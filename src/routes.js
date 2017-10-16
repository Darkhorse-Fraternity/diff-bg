import React from 'react';
import {IndexRoute, Route} from 'react-router';
// import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {isLoaded as isAuthLoaded} from 'redux/modules/auth';
import {
  App,
  Home,
  About,
  Login,
  LoginSuccess,
  Users,
  NotFound,
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      // store.dispatch(loadAuth()).then(checkAuth);
      checkAuth();
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home}/>

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="users" component={Users}/>
      </Route>

      {/* Routes */}
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
