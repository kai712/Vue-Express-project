//供应商
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const supplierClassifySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },//用户Id （供应商建立关系时绑定）
  label: {
    type: String
  },//名称
  p_id: {
    type: String,
    default: ''
  }//父级id
});
//定义model
const supplierClassify = mongoose.model("supplierClassify",supplierClassifySchema);
module.exports = supplierClassify;

