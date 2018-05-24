/*eslint-disable */
/* @flow */
'use strict'


const config = require('../config')


const methodType = {
  get: 'get',
  post: 'post',
  head: 'HEAD',
  patch: 'patch',
  put: 'put',
  delete: 'del'
}

// import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from '../configure/leancloud'

function requestSmsCode(mobilePhoneNumber) {
  return {
    path: '/requestSmsCode',
    method: methodType.post,
    params: {
      mobilePhoneNumber, //必须
    }
  }

}


/**
 * 通过手机短信来实现「忘记密码」的功能：
 * @param mobilePhoneNumber
 * @returns {{path, method, param: Arguments}}
 */
function requestPasswordResetBySmsCode(mobilePhoneNumber) {
  return {
    path: '/requestPasswordResetBySmsCode',
    method: methodType.post,
    params: {
      mobilePhoneNumber
    },
  }
}

function resetPasswordBySmsCode(password, code) {
  return {
    path: '/resetPasswordBySmsCode/' + code,
    method: methodType.put,
    params: {
      password,
    },
  }
}

/**
 * 用手机号码来注册
 * @param  {[type]} mobilePhoneNumber:string [description]
 * @param  {[type]} smsCode:string           [description]
 * @param  {[type]} password:string          [description]
 * @return {[type]}                          [description]
 */
function requestUsersByMobilePhone(mobilePhoneNumber, smsCode, password) {
  return {
    path: '/usersByMobilePhone',
    method: methodType.post,
    params: {
      mobilePhoneNumber,//必须
      smsCode,//必须，且为六位。
      //password,//不必须，要业务需求必须。
    }
  }
}


//已登录用户信息
function userMe() {
  return {
    path: '/users/me',
    method: methodType.get,
    params: {}
  }
}




function searchUser(params) {
  return {
    path: '/users',
    method: methodType.get,
    params: params
  }
}

/**
 * 使用手机和密码登录
 * @param  {[type]} mobilePhoneNumber:string 注册用的手机号码
 * @param  {[type]} password:string          密码
 * @return {[type]}                          返回参数信息
 */
function requestLogin(mobilePhoneNumber, password) {
  return {
    path: '/login',
    method: methodType.get,
    params: {
      mobilePhoneNumber,
      password,
    }
  }
}


/**
 * 获取用户
 * @param id 用户的ID
 * @returns {{path, method}}
 */
function getUserByID(id) {
  return {
    path: '/users/' + id,
    method: methodType.get,
  }
}

/**
 * 给user 数据变更。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} obj:Object    [description]
 * @return {[type]}               [description]
 */
function bindingToUser(userID, obj) {

  const path = '/users/' + userID;
  return {
    path: path,
    method: methodType.put,
    params: obj,
    needSession: true,
  }
}

/**
 * 使用新旧密码参数来修改密码
 * @param  {[type]} id:string             [description]
 * @param  {[type]} old_password:string   [description]
 * @param  {[type]} new_password:'string' [description]
 * @return {[type]}                       [description]
 */
function updatePassword(id, old_password,
                        new_password) {
  return {
    path: '/users/' + id + '/updatePassword',
    method: methodType.put,
    params: {
      old_password,
      new_password,
    },
    needSession: true,
  }
}

/**
 * 跟新用户昵称
 * @param  {[type]} id:string       用户ID
 * @param  {[type]} username:string 更新后的名字
 * @return {[type]}                 [description]
 */
function updateUserName(id, username) {
  return {
    path: '/users/' + id,
    method: methodType.put,
    needSession: true,
    params: {
      id,
      username
    }
  }
}


/*
 * 更新角色
 */
function updateRoles(id, op, rolsesId) {
  return {
    path: '/roles/' + rolsesId,
    method: methodType.put,
    params: {
      "users": {
        "__op": op,
        "objects": [
          {
            "__type": "Pointer",
            "className": "_User",
            "objectId": id
          }
        ]
      }
    }
  }
}


/**
 * 绑定文件或图片到user中。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} fileID:string [description]
 * @param  {[type]} name:string   [description]
 * @return {[type]}               [description]
 */
function bindingFileToUser(userID, fileID, name) {

  const param = {};
  param[name] = {
    "id": fileID,
    "__type": "File"
  };

  return bindingToUser(userID, param);
}

/**
 * 删除文件
 * @param  {[type]} fileID:string 文件的ID，
 * @return {[type]}               [description]
 */
function deleteFile(fileID) {
  const path = '/files/' + fileID
  return {
    path: path,
    method: methodType.delete,
  }
}

function feedbackParam(content, contact) {
  return {
    path: '/feedback',
    method: methodType.post,
    params: {
      status: 'open',
      content,
      contact,
    }
  }
}

//Object

/**
 * 基础查询,含有id 的时候则为具体值。
 * @param  {[type]} className:string 查询的类名
 * @param  {[type]} id:string        =“” 可选，具体的id
 * @return {[type]}                  [description]
 */
function classNormalSearch(className, id = '',params) {
  return {
    path: '/classes/' + className + '/' + id,
    method: methodType.get,
    params
  }
}

function limitSearch(className, page = 0,
                     limit = 40, other = {}, callPath) {
  const skip = page * limit;
  return {
    path: !callPath ? '/classes/' + className : '/call/' + callPath,
    method: !callPath ? methodType.get : methodType.post,
    params: {
      skip: skip + '',
      limit: limit + '',
      order: '-createdAt',//降序
      ...other
    }
  }
}

/**
 * 增加
 * @param  {[type]} className:string 类名
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
function classCreatNewOne(className, params) {
  return {
    path: '/classes/' + className,
    method: methodType.post,
    params,
  }
}

/**
 * 修改leancloud 对象
 * @param  {[type]} className:string 类名
 * @param  {[type]} objectId:string  对象id
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
function classUpdate(className, objectId, params) {
  return {
    path: '/classes/' + className + '/' + objectId,
    method: methodType.put,
    params,
  }
}

/**
 * 删除对象
 * 你也可以在一个对象中删除一个字段，通过 Delete 操作（注意：这时候 HTTP Method 还是 PUT）：
 * @param  {[type]} className:string [description]
 * @param  {[type]} objectId:string  [description]
 * @param  {[type]} params:Object    [description]
 * @return {[type]}                  [description]
 */
function classDelete(className, objectId, params) {
  return {
    path: '/classes/' + className + '/' + objectId,
    method: methodType.delete,
    params,
  }
}

function classBatch(requests) {
  const newRequests = requests.map((request, i) => {
    return {
      path: '/1.1' + request.path,
      method: request.method,
      body: request.params,
    }
  });
  return {
    path: '/batch',
    method: methodType.post,
    params: { requests: newRequests },
  }
}

function pushInstallation(OS, token, owner) {
  let installationId = OS == 'ios' ? { "deviceToken": token } : { "installationId": token }
  // const LeanCloud_APP_ID = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt';
  // const LeanCloud_APP_KEY = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn';
  return {
    scheme: 'https',
    host: 'leancloud.cn/1.1',
    path: '/installations',
    method: methodType.post,
    // head:{
    //     "Content-Type": "application/json",
    //     "X-LC-Key": LeanCloud_APP_KEY,
    //     "X-LC-Id": LeanCloud_APP_ID,
    // },
    params: {
      "deviceType": OS,
      ...installationId,
      "channels": [
        "public", "protected", "private"
      ],
      owner,
    },
  }
}

function push(data, where) {
  // console.log('config.remoteMHeader:', config.remoteMHeader);
  return {
    head: config.remoteMHeader,
    path: '/push',
    method: methodType.post,
    params: {
      data,
      where,
      prod: process.env.LEANCLOUD_APP_ENV === 'development' ? "dev" : "prod",
    },
  }
}


module.exports = {
  push,
  requestSmsCode,
  classNormalSearch,
  requestUsersByMobilePhone,
  userMe,
  searchUser,
  updateRoles,
  limitSearch
}