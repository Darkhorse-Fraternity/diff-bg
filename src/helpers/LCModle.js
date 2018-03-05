function point(className, objectId) {
  return {
    "__type": "Pointer",
    "className": className,
    "objectId": objectId
  }
}

function pointModel(name, objectId, className) {
  return {
    [name]: point(className || name, objectId),
  }
}

function user(objectId) {
  return pointModel("user", objectId, '_User')
}

function iCard(id) {
  return pointModel('iCard', id)
}

function iUse(id) {
  return pointModel('iUse', id)
}

module.exports = {
  point,
  pointModel,
  user,
  iCard,
  iUse
}