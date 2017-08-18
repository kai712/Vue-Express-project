const dbSupplierClassify = require('../../model/supplier/classify');

//新增或修改供应商分类
exports.editSupplierClassify = (req, res, next) => {

  const data = {};
  data.userId = req.session.userId;
  data.label = req.body.label;
  data.p_id = req.body.p_id;

  dbSupplierClassify.create(data,(err, data) => {
    if (err){
      res.json({
        result: 0,
        message: '操作失败,请重试'
      });
      return
    }
    res.json({
      result: 1,
      message: '恭喜您，操作成功',
      data: data
    });
  })

};

//获取供应商分类数据
exports.getSupplierClassify = (req, res, next) => {

  dbSupplierClassify.find({userId: req.session.userId},(err, data) => {
    if(err){
      res.json({
        result: 0,
        message: '操作失败'
      });
      return
    }
    res.json({
      result: 1,
      data: data
    });
  })
};

//删除供应商分类节点
exports.delSupplierClassify = (req, res, next) => {

  dbSupplierClassify.remove({_id:req.body._id}, err => {
    if(err){
      res.json({
        result: 0,
        message: '操作失败,请重试'
      });
      return
    }
    res.json({
      result: 1,
      message: '恭喜您,操作成功',
      _id: req.body._id
    });
  });

};
