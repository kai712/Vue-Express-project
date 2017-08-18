const login = require('./login');
const register = require('./register');
const supplier = require('./supplier');
const supplierClassify = require('./supplier/classify');
const materiel = require('./materiel');
const materielClassify = require('./materiel/classify');
const purchaseOrder = require('./purchaseOrder');
const common = require('./common');
const order = require('./order');
const tender = require('./tender');
const upload = require('./upload');

//上传图片
exports.upload = upload.upload;

//登录
exports.login = login.login;
//退出登录
exports.logOff = login.logOff;
//验证是否登录
exports.isLogin = login.isLogin;

//注册
exports.register = register.register;
//修改账户信息
exports.reviseUserInf = register.reviseUserInf;
//获取消息中心数据
exports.getNews = common.getNews;
//获取统计数据
exports.getStatisticsData = common.getStatisticsData;

//新增或修改供应商
exports.editSupplier = supplier.editSupplier;
//获取供应商列表信息
exports.getSupplier = supplier.getSupplier;
//删除供应商
exports.delSupplier = supplier.delSupplier;
//审核供应商
exports.pendSupplier = supplier.pendSupplier;

//新增或修改供应商分类
exports.editSupplierClassify = supplierClassify.editSupplierClassify;
//获取供应商分类数据
exports.getSupplierClassify = supplierClassify.getSupplierClassify;
//删除供应商分类节点
exports.delSupplierClassify = supplierClassify.delSupplierClassify;

//新增或修改物料分类
exports.editMaterielClassify = materielClassify.editMaterielClassify;
//获取物料分类数据
exports.getMaterielClassify = materielClassify.getMaterielClassify;
//删除物料分类节点
exports.delMaterielClassify = materielClassify.delMaterielClassify;

//新增或修改物料
exports.editMateriel = materiel.editMateriel;
//获取物料列表信息
exports.getMateriel = materiel.getMateriel;
//删除物料
exports.delMateriel = materiel.delMateriel;
//变更物料状态
exports.pendMateriel = materiel.pendMateriel;

//新增采购单
exports.editPurchaseOrder = purchaseOrder.editPurchaseOrder;
//获取采购单列表信息
exports.getPurchaseOrder = purchaseOrder.getPurchaseOrder;
//采购单生成订单
exports.purCreateOrder = purchaseOrder.purCreateOrder;

//获取订单列表
exports.getOrder = order.getOrder;
//删除订单
exports.delOrder = order.delOrder;
//确认收货
exports.confirmOrder = order.confirmOrder;

//新增采购单
exports.editTenderOrder = tender.editTenderOrder;
//获取采购单列表信息
exports.getTenderOrder = tender.getTenderOrder;
//采购单生成订单
exports.tenCreateOrder = tender.tenCreateOrder;

