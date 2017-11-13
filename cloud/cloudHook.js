const AV = require('leanengine');
const {iUse, iCard, iDo} = require('./cloudKeys')

const useMasterKey = {useMasterKey: true}

const normalACL = (currentUser) => {
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true);
  //说明
  acl.setRoleWriteAccess('Manager', true);
  acl.setWriteAccess(currentUser, true);
  return acl
}

const classNames = [iCard, iUse, iDo, '_User']
const ACLSet = (classNames) => {
  classNames.forEach(className => {
    setNormalACL(className)
  })
}

const setNormalACL = (className) => {
  AV.Cloud.beforeSave(className, req => new Promise((solve, reject) => {
    const {object, currentUser} = req
    if (object) {
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
      include:['iCard'],
    }).then(u =>{
      const time = u.get('time') + 1
      const period = Number(u.get('iCard').get('period'))
      const doneDate = new Date();
      u.set('time', time)
      u.set('statu', period === time ? "stop" : "start")
      u.set('doneDate', doneDate)
      u.save().catch(e=>{
        console.log('iUse save:', e.message);
      })
    }).catch(e=>{
      console.log('icard save:', e.message);
    })
    solve()
  } else {
    reject('未发现有效的' + className + '对象')
  }
}));

//删除avatar
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
