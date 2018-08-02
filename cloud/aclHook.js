const AV = require('leanengine');
const {
  iUse,
  iCard,
  iDo,
  iComment,
  Course
} = require('./cloudKeys')


const normalACL = (currentUser) => {
  const acl = new AV.ACL()
  acl.setPublicReadAccess(true);
  //说明
  acl.setRoleWriteAccess('Manager', true);
  acl.setWriteAccess(currentUser, true);
  return acl
}

const classNames = [iCard, iUse, iDo, iComment,Course]
const ACLSet = (classNames) => {
  classNames.forEach(className => {
    setNormalACL(className)
  })
}

const setNormalACL = (className) => {
  AV.Cloud.beforeSave(className, req => new Promise((solve, reject) => {
    const { object, currentUser } = req
    if (object && currentUser) {
      object.setACL(normalACL(currentUser));
      solve()
    } else {
      reject('未发现有效的' + className + '对象')
    }
  }))
}


ACLSet(classNames)







