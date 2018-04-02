

import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import config from './config';

require('../cloud')
// import cloud from '../cloud'
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import {match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import AV from 'leanengine'

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});




if (process.env.LEANCLOUD_APP_ID) {
  AV.init({
    appId: process.env.LEANCLOUD_APP_ID,
    appKey: process.env.LEANCLOUD_APP_KEY,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
  });
}


// app.enable('trust proxy');
// app.use(AV.Cloud.HttpsRedirect());

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// 加载云引擎中间件
app.use(AV.express());

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});


// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({history, routes: getRoutes(store), location: req.originalUrl},
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
          const component = (
            <MuiThemeProvider>
              <Provider store={store} key="provider">
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            </MuiThemeProvider>
          );

          res.status(200);

          global.navigator = {userAgent: req.headers['user-agent']};

          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}
                                          store={store}/>));
        });
      } else {
        res.status(404).send('Not found');
      }
    });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    // console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function (err) {
      console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', function (reason, p) {
      console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}


