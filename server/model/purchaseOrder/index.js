//采购单
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const purchaseOrderSchema = new mongoose.Schema({
  userId: {
    type: String
  },//所属账号Id
  materielId: {
    type: String,
    required: true
  },//物料id
  Title: {
    type: String
  },//物料名称
  imgUrls: {
    type: Array
  },//产品图片
  issueDate: {
    type: Date,
    required: true
  },//发布时间
  Name: {
    type: String,
    required: true
  },//采购人
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
  Mobile: {
    type: String,
    required: true
  },//联系电话
  remark: {
    type: String
  },//备注
  Items: {
    type: Array
  }//供应商相关[{supplierId:"供应商id",supplierName:"供应商名称",price:所报单价,remark:"备注"}], //  json格式
});

//定义model
const purchaseOrder = mongoose.model("purchaseOrder",purchaseOrderSchema);
module.exports = purchaseOrder;
