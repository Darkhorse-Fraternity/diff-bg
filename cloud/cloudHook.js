const AV = require('leanengine');
const {
  iUse,
  iCard,
  iDo,
  iComment
} = require('./cloudKeys')


const normalACL = (currentUser) => {
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true);
  //说明
  acl.setRoleWriteAccess('Manager', true);
  acl.setWriteAccess(currentUser, true);
  return acl
}

const classNames = [iCard, iUse, iDo, iComment]
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



