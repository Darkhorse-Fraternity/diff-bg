
const AV = require('leanengine');
const {iUse,iCard,iDo} = require('./cloudKeys')

const useMasterKey = {useMasterKey: true }


AV.Cloud.afterSave(iUse,req => {
    const query = new AV.Query(iCard);
    return query.get(req.object.get(iCard).id).then(function(card) {
        card.increment('useNum');
        return card.save(null,useMasterKey);
    });
})

AV.Cloud.afterDelete(iUse,req => {
    const query = new AV.Query(iCard);
    return query.get(req.object.get(iCard).id).then(function(card) {
        card.increment('useNum',-1);
        return card.save(null,useMasterKey);
    });
})


const normalACL = (currentUser)=>{
    const acl = new AV.ACL()
    acl.setPublicReadAccess(true);
    //说明
    // acl.setRoleWriteAccess('Administrator',true);
    acl.setWriteAccess(currentUser, true);
    return acl
}

const classNames = [iCard,iUse,iDo]
const ACLSet = (classNames)=>{
    classNames.forEach(className =>{
        setNormalACL(className)
    })
}

const setNormalACL = (className)=>{
    AV.Cloud.beforeSave(className,req => new Promise((solve, reject)=>{
        const {object,currentUser} = req
        if(object){
            object.setACL(normalACL(currentUser));
            solve()
        }else {
            reject('未发现有效的'+className+'对象')
        }
    }))
}

ACLSet(classNames)