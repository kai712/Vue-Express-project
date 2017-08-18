const api = require('../api');

exports.app = (app) => {
//上传图片
  app.post('/api/upload',api.upload);

//注册
  app.post('/api/register',api.register);
//登录
  app.post('/api/login',api.login);
//退出登录
  app.post('/api/logOff',api.logOff);
//验证是否登录
  app.post('/api/isLogin',api.isLogin);
//修改账户信息
  app.post('/api/reviseUserInf',api.reviseUserInf);
//获取消息中心数据
  app.get('/api/getNews', api.getNews);
//获取统计数据
  app.get('/api/getStatisticsData', api.getStatisticsData);

//新增或修改供应商
  app.post('/api/editSupplier',api.editSupplier);
//获取供应商列表信息
  app.post('/api/getSupplier',api.getSupplier);
//删除供应商
  app.post('/api/delSupplier',api.delSupplier);
//审核供应商
  app.post('/api/pendSupplier',api.pendSupplier);
//新增或修改供应商分类
  app.post('/api/editSupplierClassify',api.editSupplierClassify);
//获取供应商分类
  app.get('/api/getSupplierClassify',api.getSupplierClassify);
//删除供应商分类节点
  app.post('/api/delSupplierClassify',api.delSupplierClassify);

//新增或修改物料分类
  app.post('/api/editMaterielClassify',api.editMaterielClassify);
//获取物料分类
  app.get('/api/getMaterielClassify',api.getMaterielClassify);
//删除物料分类节点
  app.post('/api/delMaterielClassify',api.delMaterielClassify);
//新增或修改物料
  app.post('/api/editMateriel',api.editMateriel);
//获取物料列表信息
  app.post('/api/getMateriel',api.getMateriel);
//删除物料
  app.post('/api/delMateriel',api.delMateriel);
//变更物料状态
  app.post('/api/pendMateriel',api.pendMateriel);

//新增采购单
  app.post('/api/editPurchaseOrder',api.editPurchaseOrder);
//获取采购单列表信息
  app.post('/api/getPurchaseOrder',api.getPurchaseOrder);
//采购单生成订单
  app.post('/api/purCreateOrder',api.purCreateOrder);

//获取订单列表
  app.post('/api/getOrder',api.getOrder);
//删除 订单
  app.post('/api/delOrder',api.delOrder);
//确认收货
  app.post('/api/confirmOrder',api.confirmOrder);

//发布全局招标
  app.post('/api/editTenderOrder',api.editTenderOrder);
//获取全局招标列表信息
  app.post('/api/getTenderOrder',api.getTenderOrder);
//全局招标生成订单
  app.post('/api/tenCreateOrder',api.tenCreateOrder);
}
