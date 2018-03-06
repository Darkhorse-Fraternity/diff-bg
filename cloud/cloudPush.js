const ApiClient = require('../src/helpers/ApiClient')
const { push } = require('../src/helpers/leanCloud')


const lcPush = (title, body, url, vParams, where) => {
  const params = push({
    "ios": {
      "alert": {
        "title": title,
        "body": body,
      },
      "webUrl": url,
      "badge": "Increment",
      "sound": "tip.mp3",
      "params": vParams,
    },
    "android": {
      "webUrl": url,
      "title": title,
      "alert": body,
      "silent": false,
      "action": "com.avos.UPDATE_STATUS",
      "params": vParams,
    }
  }, where);

  const client = new ApiClient()
  return client.req(params)
}

module.exports = {
  lcPush,
}