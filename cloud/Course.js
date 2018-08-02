//删除avatar

const AV = require('leanengine');
const {
  Course,
} = require('./cloudKeys')


AV.Cloud.beforeUpdate(Course, (req, res) => {
  const cover = req.object.get("cover")
  if (cover) {
    const newCoverID = cover.get("objectId")
    req.object.fetch().then(c => {
      const cover2 = c.get("cover")
      const lastCoverID = cover2.get("objectId")
      // console.log('id',newImgID, lastImgID);
      if (newCoverID !== lastCoverID) {
        cover2.destroy().then(suc => {
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
  } else {
    res.success();
  }
})