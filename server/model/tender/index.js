//招标
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const tenderSchema = new mongoose.Schema({
  customerId: {
    type: String
  },//采购方账号Id
  Title: {
    type: String,
    required: true
  },//标题
  imgUrls: {
    type: Array
  },//产品图片
  issueDate: {
    type: Date,
    required: true
  },//发布时间
  customerName: {
    type: String,
    required: true
  },//采购方公司名称
  quotationNum: {
    type: Number,
    default: 0
  },//报价数量
  quality: {
    type: Number
  },//采购数量
  Unit: {
    type: String
  },//单位
  Name: {
    type: String
  },//收货人
  Mobile: {
    type: String,
    required: true
  },//联系电话
  remark: {
    type: String
  },//备注
  Items: {
    type: Array,
    default: []
  }//供应商相关[{supplierId:"供应商id",supplierName:"供应商名称",price:所报单价,remark:"备注"}], //  json格式
});
//定义model
const tender = mongoose.model("tender",tenderSchema);
module.exports = tender;
