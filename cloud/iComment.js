const AV = require('leanengine');
const {
  iUse,
  iCard,
  iDo,
  iComment
} = require('./cloudKeys')
const ApiClient = require('../src/helpers/ApiClient')
const useMasterKey = {useMasterKey: true}
const {push} = require('../src/helpers/leanCloud')
const {user} = require('../src/helpers/LCModle')