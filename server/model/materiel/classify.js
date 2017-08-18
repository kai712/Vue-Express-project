//物料分类
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const materielClassifySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },//用户Id
  label: {
    type: String
  },//名称
  p_id: {
    type: String,
    default: ''
  }//父级id
});
//定义model
const materielClassify = mongoose.model("materielClassify",materielClassifySchema);
module.exports = materielClassify;

