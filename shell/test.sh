
curl -X POST \
  -H "X-LC-Id: q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt"          \
  -H "X-LC-Key: njvke2r653u04lm7dpporogtsgz2d2mw5wfcartktn9kwo6f,master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where":{
            "user":{
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": "59a5029644d9040058136049"
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
              "params":{"iCard":{"title":"ceshi","objectId":"59ff053b1579a300457b440a"}}
           },
          "android":{
                   "webUrl" : "combo://Serve",
                   "title": "combo test",
                   "alert": "body",
                   "silent": false,
                   "action": "com.avos.UPDATE_STATUS",
                   "params":{"iCard":{"title":"ceshi","objectId":"59ff053b1579a300457b440a"}}
           }
        }
     }' \
https://api.leancloud.cn/1.1/push

