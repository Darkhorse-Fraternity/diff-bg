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
  Share
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
      if(__SERVER__){
        cb()
        return;
      }


      const interValId = setInterval(()=>{
          checkAuth();
          // console.log('interValId:', interValId);
          clearInterval(interValId)
      },1000)
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
      <Route component={App}>
        {/* Home (main) route */}
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="login" component={Login}/>

        {/* Routes requiring login */}
        <Route onEnter={requireLogin}>
          <Route path="users" component={Users}/>
        </Route>
      </Route>

      <Route path="share" component={Share}/>
      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
