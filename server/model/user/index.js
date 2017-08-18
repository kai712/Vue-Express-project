const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const userSchema = new mongoose.Schema({
    code: {
      type: String,
      default: Math.random().toString(36).substr(2)
    },//邀请码
    username: {
      type: String,
      required: true
    },//用户名
    pass: {
      type: String
    },//密码
    orgName: {
      type: String
    }//公司名称
});
//定义model
const user = mongoose.model("user",userSchema);
module.exports = user;
