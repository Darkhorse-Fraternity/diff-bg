
const AV = require('leanengine');
const {iUse,iCard,iDo} = require('./cloudKeys')


AV.Cloud.define('cardList', (req)=> {
    const {params}  = req
    const query = new AV.Query(iCard);
    query.equalTo('state', 1);
    //按人数多少排列。
    query.skip(params.skip)
    query.limit(40)

    // query.ascending('createdAt');
    query.descending('useNum');

    // query.order
    //设置每次搜索个数

    return query.find().then(results=>results);
});