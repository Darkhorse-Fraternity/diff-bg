/*eslint-disable */
/**
 * Created by lintong on 9/17/16.
 * @flow
 */
'use strict';
const md5  =  require("md5");

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.LEANCLOUD_APP_ENV || process.env.NODE_ENV || 'development'];

const  id_dev = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt'
const  key_dev = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn'

const  id_pro = 'cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz'
const  key_pro = 'S6wxWnhQfL9rBLo2ngEctK0u'


const LeanCloud_APP_ID =  !environment.isProduction ? id_dev : id_pro
const  LeanCloud_APP_KEY =  !environment.isProduction ? key_dev : key_pro

const timeStamp = Math.round(new Date())
const LeanCloud_APP_SIGN =  md5( timeStamp + LeanCloud_APP_KEY ) + ',' + timeStamp

module.exports ={
  LeanCloud_APP_SIGN,
  LeanCloud_APP_ID
}


