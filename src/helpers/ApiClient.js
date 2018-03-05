// import superagent from 'superagent';
// import config from '../config';
// import {toQueryString} from './useMeth';
const superagent = require('superagent')
const config = require('../config')
const {toQueryString} = require('./useMeth')


const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

// process.env.LEANCLOUD_API_SERVER


class ApiClient {

  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
      }));
  }


  req(data) {
    let {host,path, method,timeout,params,head} = data;
    host = host || config.remoteApiHost;
    path = path || '/';
    method = method || 'get';
    timeout = timeout || 20000;
    head = head || config.remoteHeader

    return new Promise((resolve, reject) => {
      const adjustedPath = path[0] !== '/' ? '/' + path : path;
      const url = host + adjustedPath;
      const request = superagent[method](url);
      request.set(head);
      request.timeout(timeout);
      if (method === 'get') {
        const queryString = toQueryString(params);
        request.query(queryString);
      } else {
        request.send(params);
      }
      request.end((err, {body} = {}) => err ? reject(err) : resolve(body));
    });
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
}

module.exports = ApiClient