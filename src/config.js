/*eslint-disable */


console.log('test:', 'config');

require('babel-polyfill');
const {
  LeanCloud_APP_ID,
  LeanCloud_APP_SIGN,
  LeanCloud_APP_M_KEY
} = require('./lckey');
// require('../cloud')

const environment = require('./env');

const config = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.LEANCLOUD_APP_PORT || process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  remoteApiHost: process.env.LEANCLOUD_API_SERVER ? (process.env.LEANCLOUD_API_SERVER + '/1.1') :
    'https://api.leancloud.cn/1.1',
  remoteApiPort: '',
  remoteHeader: {
    'X-LC-Id': LeanCloud_APP_ID,
    'X-LC-Sign': LeanCloud_APP_SIGN,
  },
  remoteMHeader: {
    'X-LC-Id': LeanCloud_APP_ID,
    'X-LC-Key': LeanCloud_APP_M_KEY,
  },
  app: {
    title: '小改变',
    description: '小改变,大不同',
    head: {
      titleTemplate: '小改变: %s',
      meta: [
        {name: 'description', content: '小改变'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: '小改变'},
        {property: 'og:image', content: 'https://icard.leanapp.cn/logo.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Combo'},
        {property: 'og:description', content: '小改变'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@tonyYo'},
        {property: 'og:creator', content: '@tonyYo'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);

module.exports = config;
