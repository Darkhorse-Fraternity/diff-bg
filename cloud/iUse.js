const AV = require('leanengine');
const {
  iUse,
  iCard,
} = require('./cloudKeys')
const useMasterKey = {useMasterKey: true}


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