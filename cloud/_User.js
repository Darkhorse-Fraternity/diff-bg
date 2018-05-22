const AV = require('leanengine');


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