const AV = require('leanengine');
const { User } = require('./cloudKeys')

//当用户通过邮箱或者短信验证时，对该用户执行特定操作。比如：
AV.Cloud.onLogin(function(request) {
  // 因为此时用户还没有登录，所以用户信息是保存在 request.object 对象中
  // console.log("on login:", request.object);
  if (request.object.get('username') === 'noLogin') {
    // 如果是 error 回调，则用户无法登录（收到 401 响应）
    throw new AV.Cloud.Error('Forbidden');
  }
});


//在用户登录之时执行指定操作，比如禁止在黑名单上的用户登录：
AV.Cloud.onVerified('sms', function(request) {
  console.log('onVerified: sms, user: ' + request.object);
});


AV.Cloud.beforeUpdate(User, (req, res) => {

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


// AV.Cloud.afterSave(User, req => new Promise((solve, reject) => {
//   const { object,currentUser } = req
//   //User 只有在注册后才能拿到objectId
//   if (object && object.id ) {
//     const acl = new AV.ACL()
//     acl.setPublicReadAccess(true);
//     //说明
//     acl.setRoleWriteAccess('Manager', true);
//     acl.setWriteAccess(object.id, true);
//     object.setACL(acl);
//     // object.disableAfterHook();
//     // object.fetch().then(async obj => {
//     //   console.log('object.id:', object.id );
//     //
//     //
//     //   obj.setACL(acl);
//     //
//     // })
//     object.save().then(d=>{
//       solve()
//     })
//   } else {
//     reject('未发现有效的' + className + '对象')
//   }
// }))