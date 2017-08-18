/**
 * Created by Administrator on 2017/7/25 0025.
 */
//订单
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const orderSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true
  },//供应商id
  customerId: {
    type: String,
    required: true
  },//客户id
  orderNum: {
    type: String,
    required: true
  },//订单号
  productName: {
    type: String,
    required: true
  },//产品名称
  imgUrls: {
    type: Array
  },//产品图片
  setOrderDate: {
    type: Date,
    required: true
  },//下单时间
  price: {
    type: String
  },//订单单价
  quality: {
    type: Number
  },//数量
  Unit: {
    type: String
  },//单位
  orderState: {
    type: Number,
    default: 0
  },//订单状态  0待发货 1已发货  2已收货
  consignee: {
    type: String
  },//收货人
  mobile: {
    type: String
  },//联系方式
  supplierName: {
    type: String
  },//供应商名称
  customerName: {
    type: String
  },//客户名称
});

//定义model
const order = mongoose.model("order",orderSchema);
module.exports = order;
