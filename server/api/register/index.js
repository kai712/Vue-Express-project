const dbUser = require('../../model/user');
const md5 = require('md5');
const async = require('async');

//注册
exports.register = (req, res, next) => {

  const data = {};
  data.username = req.body.username;
  data.pass = md5(req.body.pass);
  data.orgName = req.body.orgName;
  async.waterfall([
    callback => {
      dbUser.find({username:req.body.username},(err, data) => {
        if(data.length !== 0){
          callback(err, 0);
        }else {
          callback(err, 1);
        }
      })
    },
    (aa,callback) => {
      if(aa===1){
        dbUser.create(data,err => {
          callback(err, 1);
        })
      }else {
        callback(null, 0);
      }
    }
  ],(err, results) => {
    if (err) {
      res.json({result:2});
      return
    }
    res.json({result:results})
  });

};

//修改账户信息
exports.reviseUserInf = (req, res, next) => {

  res.json({
    result:2,
    message: '暂不支持修改账户信息！'
  });
/*  const data = {};
  data.username = req.body.username;
  data.orgName = req.body.orgName;
  dbUser.update({_id:req.body._id},data,(err, data) => {
     if (err){
         res.json({
           result: 0
         });
         return
     }
     res.json({
       result: 1,
       username : req.body.username,
       orgName : req.body.orgName
     });
  });*/

};

