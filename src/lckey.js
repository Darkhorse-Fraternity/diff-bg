/*eslint-disable */
/**
 * Created by lintong on 9/17/16.
 * @flow
 */
'use strict';
const md5  =  require("md5");
const environment = require('./env')


// const  id_dev = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt'
// const  key_dev = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn'
// const  key_m_dev = 'njvke2r653u04lm7dpporogtsgz2d2mw5wfcartktn9kwo6f,master'


const  id_dev = 'cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz'
const  key_dev = 'S6wxWnhQfL9rBLo2ngEctK0u'
const  key_m_dev = 'jYL7hiGyAArkuMcp8F8llI52,master'

const  id_pro = 'cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz'
const  key_pro = 'S6wxWnhQfL9rBLo2ngEctK0u'
const  key_m_pro = 'jYL7hiGyAArkuMcp8F8llI52,master'


// console.log('LEANCLOUD_APP_ENV:', process.env.LEANCLOUD_APP_ENV);
let LeanCloud_APP_ID =  !environment.isProduction ? id_dev : id_pro
let LeanCloud_APP_KEY =  !environment.isProduction ? key_dev : key_pro
let LeanCloud_APP_M_KEY =  !environment.isProduction ? key_m_dev : key_m_pro

LeanCloud_APP_ID = process.env.LEANCLOUD_APP_ID ||  LeanCloud_APP_ID
LeanCloud_APP_KEY = process.env.LEANCLOUD_APP_KEY ||  LeanCloud_APP_KEY

const timeStamp = Math.round(new Date())
const LeanCloud_APP_SIGN =  md5( timeStamp + LeanCloud_APP_KEY ) + ',' + timeStamp

module.exports ={
  LeanCloud_APP_SIGN,
  LeanCloud_APP_ID,
  LeanCloud_APP_M_KEY
}


