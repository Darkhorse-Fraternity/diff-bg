
curl -X POST \
  -H "X-LC-Id: q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt"          \
  -H "X-LC-Key: njvke2r653u04lm7dpporogtsgz2d2mw5wfcartktn9kwo6f,master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where":{
            "user":{
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": "5a20c7630b616000457eb881"
            }
        },
        "prod": "dev",
        "data": {
          "ios":{
             "alert" : {
                "title":"test",
                "body":"body",
             },
              "webUrl" : "combo://Information",
              "badge":"Increment"
           },
          "android":{
                   "webUrl" : "combo://Information",
                   "title": "combo test",
                   "alert": "body",
                   "silent": false,
                   "action": "com.avos.UPDATE_STATUS",
           }
        }
     }' \
https://api.leancloud.cn/1.1/push

