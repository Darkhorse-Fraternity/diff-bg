import React from 'react';
import { IndexRoute, Route } from 'react-router';
// import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  About,
  Login,
  Users,
  NotFound,
  Share,
  Admin
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }


    if (!isAuthLoaded(store.getState())) {
      if (__SERVER__) {
        cb()
        return;
      }


      const interValId = setInterval(() => {
        checkAuth();
        // console.log('interValId:', interValId);
        clearInterval(interValId)
      }, 1000)
      // checkAuth();
    } else {
      checkAuth();
    }
  };

  store.dispatch(loadAuth(store.getState()));

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      {/* Routes */}
      {/*Front*/}
      <Route component={App}>
        {/* Home (main) route */}
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
      </Route>

      <Route component={Admin}>
        {/* Home (main) route */}
        <Route onEnter={requireLogin}>
          <Route path="users" component={Users}/>
        </Route>
        <Route path="login" component={Login}/>
      </Route>
      {/*后台*/}


      <Route path="share" component={Share}/>
      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
