const AV = require('leanengine');
const {iUse, iCard, iDo} = require('./cloudKeys')
const ApiClient = require('../src/helpers/ApiClient')
const useMasterKey = {useMasterKey: true}
const {push} = require('../src/helpers/leanCloud')
const {user} = require('../src/helpers/LCModle')

const normalACL = (currentUser) => {
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true);
  //说明
  acl.setRoleWriteAccess('Manager', true);
  acl.setWriteAccess(currentUser, true);
  return acl
}

const classNames = [iCard, iUse, iDo]
const ACLSet = (classNames) => {
  classNames.forEach(className => {
    setNormalACL(className)
  })
}

const setNormalACL = (className) => {
  AV.Cloud.beforeSave(className, req => new Promise((solve, reject) => {
    const {object, currentUser} = req
    if (object && currentUser) {
      object.setACL(normalACL(currentUser));
      solve()
    } else {
      reject('未发现有效的' + className + '对象')
    }
  }))
}


ACLSet(classNames)


//添加iDo 之后，修改iUse


AV.Cloud.afterSave('iDo', req => new Promise((solve, reject) => {
  const {object, currentUser} = req
  if (object) {
    const use = object.get(iUse);

    use.fetch({
      include: ['iCard', 'user', 'iCard,user'],
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
      console.log('icard save2:', e.code, e.message);
    })

    solve()
  } else {
    reject('未发现有效的' + className + '对象')
  }
}));

//删除avatar

AV.Cloud.beforeUpdate(iCard, (req, res) => {
  const img = req.object.get("img")
  const newImgID = img.get("objectId")
  req.object.fetch().then(c => {
    const img2 = c.get("img")
    const lastImgID = img2.get("objectId")
    // console.log('id',newImgID, lastImgID);
    if (newImgID !== lastImgID) {
      img2.destroy().then(suc => {
        // console.log('delete:', suc);
      }, e => {
        console.log('test:', e.message);
      });
    }
    res.success();
  }).catch(e => {
    console.log('fetch error:', e.message);
    res.success();
  })
})


AV.Cloud.beforeUpdate('_User', (req, res) => {

  const avatar = req.currentUser && req.currentUser.get('avatar')
  const id1 = avatar && avatar.get('id');
  const id2 = req.object && req.object.get('avatar');
  if (id1 && id2 && id1 !== id2) {
    const file = AV.File.createWithoutData(id1);
    file.destroy().then(suc => {
    }, e => {
      console.log('test:', e.message);
    });
  }

  //直接先返回结果
  res.success();

})


AV.Cloud.afterDelete(iUse, req => {
  const query = new AV.Query(iCard);
  return query.get(req.object.get(iCard).id).then(function (card) {
    card.increment('useNum', -1);
    return card.save(null, useMasterKey);
  });
});


AV.Cloud.afterSave(iUse, req => {
  const query = new AV.Query(iCard);
  return query.get(req.object.get(iCard).id).then(function (card) {
    card.increment('useNum');
    return card.save(null, useMasterKey);
  });
});
