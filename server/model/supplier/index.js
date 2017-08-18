//供应商
const mongoose = require('mongoose');
const promise = require('../db');

//定义Schema
const supplierSchema = new mongoose.Schema({
  supplierCodeId: {
    type: String
  },//所属供应商分类Id  （供应商建立关系时绑定）
  userId: {
    type: String
  },//所属核心企业Id （供应商建立关系时绑定）
  orgName: {
    type: String,
    required: true
  },//+++++++++++基本信息  企业名称
  orgBusinessLicenseCode: {
    type: String,
    required: true
  },//营业执照号码
  orgType: {
    type: String
  },//企业类型
  orgMainBusiness: {
    type: String
  },//主营行业
  orgAddress: {
    type: Array
  },//经营地址
  orgContactName: {
    type: String
  },//法定代表人
  orgContactEmail: {
    type: String
  },//企业邮箱
  orgRemark: {
    type: String
  },//企业介绍
  state: {
    type: Boolean
  },//状态  false禁用  true启用
  name: {
    type: String,
    required: true
  },//++++++++++账号信息  联系人
  Mobile: {
    type: String
  },//手机
  jobName: {
    type: String
  },//职位
  contactEmail: {
    type: String,
    required: true
  },//工作邮箱
  label: {
    type: String
  }//所属供应商分类名称
});
//定义model
const supplier = mongoose.model("supplier",supplierSchema);
module.exports = supplier;
