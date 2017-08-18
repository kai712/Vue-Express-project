//物料
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const materielSchema = new mongoose.Schema({
  userId: {
    type: String
  },//所属账号ID
  Name: {
    type: String,
    required: true
  },//物料名称
  CategoryId: {
    type: String
  },//所属物料分类
  label: {
    type: String
  },//所属物料分类名称
  Code: {
    type: String,
    required: true
  },//物料编码
  quality: {
    type: Number
  },//需求量
  Unit: {
    type: String
  },//单位
  state: {
    type: Boolean,
    default: true
  },//状态 0禁用  1启用
  remark: {
    type: String
  },//用途和备注
  imgUrls: {
    type: Array
  }//产品图片
});

//定义model
const materiel = mongoose.model("materiel",materielSchema);
module.exports = materiel;
