/*eslint-disable */
/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {Router, browserHistory, applyRouterMiddleware} from 'react-router';
// import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { useScroll } from 'react-router-scroll';
// import createHistory from 'history/createBrowserHistory'
import env from './env'

import getRoutes from './routes';

const client = new ApiClient();
// const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
// const history = syncHistoryWithStore(_browserHistory, store);

// const history = createHistory()
const reloadOnPropsChange = (props, nextProps) => {
  // reload only when path/route has changed
  return props.location.pathname !== nextProps.location.pathname;
};

const component = (
  <Router
    render={(props) => (
      <ReduxAsyncConnect
        {...props}
        helpers={{ client }}
        filter={item => !item.deferred}
        reloadOnPropsChange={reloadOnPropsChange}
        render={applyRouterMiddleware(useScroll())}
      />
    )}
    history={browserHistory}
    routes={getRoutes(store)}
  />

);




if (!env.isProduction) {
  window.React = React; // enable debugger

  // if (!dest || !dest.firstChild || !dest.firstChild.attributes ||
  //   !dest.firstChild.attributes['data-react-checksum']) {
  //   console.error('Server-side React render was discarded. ' +
  //     'Make sure that your initial render does not contain any client-side code.');
  // }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.hydrate(
    <MuiThemeProvider theme={{}}>
      <Provider store={store} key="provider">
        <div>
          {component}
          <DevTools/>
        </div>
      </Provider>
    </MuiThemeProvider>,
    dest
  );
}else {
  ReactDOM.hydrate(
    <MuiThemeProvider theme={{}}>
      <Provider store={store} key="provider">
        {component}
      </Provider>
    </MuiThemeProvider>,
    dest
  );
}
