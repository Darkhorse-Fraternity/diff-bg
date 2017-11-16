
curl -X POST \
  -H "X-LC-Id: q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt"          \
  -H "X-LC-Key: njvke2r653u04lm7dpporogtsgz2d2mw5wfcartktn9kwo6f,master"        \
  -H "Content-Type: application/json" \
  -d '{
        "where":{
            "user":{
                    "__type": "Pointer",
                    "className": "user",
                    "objectId": "59a5029644d9040058136049"
            }
        },
        "prod": "dev",
        "data": {
             "alert" : {
                "title":"test",
                "body":"body",
             },
              "webUrl" : "combo://Information",
              "title": "combo test",
              "silent": false,
              "action": "com.avos.UPDATE_STATUS",
        }
     }' \
https://leancloud.cn/1.1/push

