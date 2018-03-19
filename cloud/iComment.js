const AV = require('leanengine');
const {
  iDo,
  iCard,
  iComment,
} = require('./cloudKeys')
const { user } = require('../src/helpers/LCModle')
const { lcPush } = require('./cloudPush')
const env = require('../src/env')

AV.Cloud.afterSave(iComment, req => new Promise((solve, reject) => {
  const { object, currentUser } = req
  if (object) {
    const Do = object.get(iDo);
    Do.fetch({
      include: ['iCard', 'user'],
    }).then(async d => {

      d.increment('commentNum', 1);
      const doUser = d.get('user')
      if (doUser.id !== currentUser.id) {
        d.set('commentNew', true)
      }
      d.save(null, { user: currentUser,useMasterKey: true }).catch(e => {
        console.log('iDo save:', e.message);
      })

      //当在正式环境下，只有id 不为自己时候才进这个方法。
      if (!env.isProduction || doUser.id !== currentUser.id) {
        //发送给卡片的拥有者。
        const card = d.get('iCard')
        const title = card.get('title');
        const body = currentUser.get('username') + "在" + title + '下发表了一个评论,快去看看吧~!';
        const url = "combo://RComment"
        // const vParam = card.toJSON()
        const iDoItem = d.toJSON()
        iDoItem.user = {}
        iDoItem.iCard = {}
        iDoItem.iUse = {}

        const vParam = {
          "data": iDoItem
        }
        const where = user(doUser.id)
        const res = await lcPush(title, body, url, vParam, where)
        // console.log('client.req:', res);
      }

    }).catch(e => {
      // console.log('icard save1:', e);
      console.log('icard save2:', e);
    })

    solve()
  } else {
    reject('未发现有效的' + iComment + '对象')
  }
}));