require('babel-polyfill');
const {LeanCloud_APP_ID, LeanCloud_APP_SIGN} = require('./lckey');
// require('../cloud')
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.LEANCLOUD_APP_ENV || process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.LEANCLOUD_APP_PORT || process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  remoteApiHost: environment.isProduction ?
    'cmwljtyw.api.lncld.net/1.1' :
    'q81jdsbi.api.lncld.net/1.1',
  remoteApiPort: '',
  remoteHeader: {
    'X-LC-Id': LeanCloud_APP_ID,
    'X-LC-Sign': LeanCloud_APP_SIGN,
  },
  app: {
    title: 'Combo',
    description: '一款有着鼓励功能的Todo',
    head: {
      titleTemplate: 'Combo: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
