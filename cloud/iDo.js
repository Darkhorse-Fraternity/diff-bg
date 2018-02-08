const AV = require('leanengine');
const {
  iUse,
  iCard,
  iDo,
} = require('./cloudKeys')
const ApiClient = require('../src/helpers/ApiClient')
const {push} = require('../src/helpers/leanCloud')
const {user} = require('../src/helpers/LCModle')


AV.Cloud.afterSave('iDo', req => new Promise((solve, reject) => {
  const {object, currentUser} = req
  if (object) {
    const use = object.get(iUse);

    use.fetch({
      include: ['iCard', 'user', 'iCard.user'],
    }).then(async u => {
      const card = u.get('iCard')
      const time = u.get('time') + 1
      const period = Number(card.get('period'))
      const doneDate = new Date();
      u.set('time', time)
      u.set('statu', period === time ? "stop" : "start")
      u.set('doneDate', doneDate)
      u.save(null, {user: currentUser}).catch(e => {
        console.log('iUse save:', e.message);
      })

      if (card.get('user').id !== currentUser.id) {
        //发送给卡片的拥有者。
        const title = card.get('title');
        const body = currentUser.get('username') + '刚刚打卡了,快去看看吧~!';
        const url = "combo://Serve"
        // const vParam = card.toJSON()
        const vParam = {
          "iCard":
            {
              "title": card.get('title'),
              "objectId": card.get('objectId')
            }
        }
        const params = push({
          "ios": {
            "alert": {
              "title": title,
              "body": body,
            },
            "webUrl": url,
            "badge": "Increment",
            "sound": "tip.mp3",
            "params": vParam,
          },
          "android": {
            "webUrl": url,
            "title": title,
            "alert": body,
            "silent": false,
            "action": "com.avos.UPDATE_STATUS",
            "params": vParam,
          }
        }, user(card.get('user').id));
        const client = new ApiClient()
        const res = await client.req(params)
        console.log('client.req:', res);
      }

    }).catch(e => {
      // console.log('icard save1:', e);
      console.log('icard save2:', e);
    })

    solve()
  } else {
    reject('未发现有效的' + 'ido' + '对象')
  }
}));