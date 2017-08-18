const dbUser = require('../../model/user');
const md5 = require('md5');

//登录
exports.login = (req, res, next) => {

  dbUser.find({ username: req.body.username, pass: md5(req.body.pass) },(err, data) => {
    if(data.length !== 0){
      req.session.sign = true;
      req.session.username = req.body.username;
      req.session.userId = data[0]._id;
      req.session.code = data[0].code;
      req.session.orgName = data[0].orgName;
      res.json({
        result: 1,
        message: "欢迎您，"+req.session.username+""
      })
    }else {
      res.json({
        result: 0,
        message: '用户名不存在或者密码错误，请重试'
      })
    }
  });

};

//退出登录
exports.logOff = (req, res, next) => {
  req.session.cookie.maxAge = 0;
  res.json({
    result: 1,
    session: req.session
  });

};

//验证是否登录
exports.isLogin = (req, res, next) => {

  res.json({
    result: 1,
    username: req.session.username,
    _id: req.session.userId,
    code: req.session.code,
    orgName: req.session.orgName,
  });

};



