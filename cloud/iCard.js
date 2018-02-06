//删除avatar

const AV = require('leanengine');
const {
  iCard,
} = require('./cloudKeys')


AV.Cloud.beforeUpdate(iCard, (req, res) => {
  const img = req.object.get("img")
  if (img) {
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
  } else {
    res.success();
  }
})