
curl -X POST \
  -H "X-LC-Id: cmwLjTYWoYfN4jCgPR49rsi6-gzGzoHsz"          \
  -H "X-LC-Key: jYL7hiGyAArkuMcp8F8llI52,master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where":{
            "user":{
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": "595df22a1b69e64c8de8f549"
            }
        },
        "prod": "dev",
        "data": {
          "ios":{
             "alert" : {
                "title":"test",
                "body":"body",
             },
              "webUrl" : "combo://Serve",
              "badge":"Increment",
              "sound": "tip.mp3",
              "params":{"iCard":{"title":"ceshi","objectId":"59cb8609ee920a0044a919dd"}}
           },
          "android":{
                   "webUrl" : "combo://Serve",
                   "title": "combo test",
                   "alert": "body",
                   "silent": false,
                   "action": "com.avos.UPDATE_STATUS",
                   "params":{"iCard":{"title":"ceshi","objectId":"59cb8609ee920a0044a919dd"}}
           }
        }
     }' \
https://api.leancloud.cn/1.1/push

