const AV = require('leanengine');
const {
  iUse,
  iCard,
  iDo,
} = require('./cloudKeys')
const {user} = require('../src/helpers/LCModle')
const {lcPush} = require('./cloudPush')

AV.Cloud.afterSave(iDo, req => new Promise((solve, reject) => {
  const {object, currentUser} = req
  if (object) {
    const use = object.get(iUse);

    // const iDoItem = object.toJSON()
    use.fetch({
      include: ['iCard', 'user', 'iCard.user'],
    }).then(async u => {
      const card = u.get('iCard')
      const time = u.get('time') + 1
      const period = Number(card.get('period'))
      const doneDate = new Date();
      u.set('time', time)
      u.set('statu', time % period === 0 ? "stop" : "start")
      u.set('doneDate', doneDate)
      u.save(null, {user: currentUser}).catch(e => {
        console.log('iUse save:', e.message);
      })

      if (card.get('user').id !== currentUser.id) {
        //发送给卡片的拥有者。
        const title = card.get('title');
        const body = currentUser.get('username') + '刚刚打卡了,快去看看吧~!';
        const url = "combo://RComment"
        // const vParam = card.toJSON()
        const vParam = {
          "data":
            {
              "title": card.get('title'),
              "objectId": card.get('objectId')
            }
        }
        const where = user(card.get('user').id)
        const res = await lcPush(title,body,url,vParam,where)
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