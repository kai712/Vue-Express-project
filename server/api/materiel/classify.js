const dbMaterielClassify = require('../../model/materiel/classify');

//新增或修改物料分类
exports.editMaterielClassify = (req, res, next) => {

  const data = {};
  data.userId = req.session.userId;
  data.label = req.body.label;
  data.p_id = req.body.p_id;

  dbMaterielClassify.create(data,(err, data) => {
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

//获取物料分类数据
exports.getMaterielClassify = (req, res, next) => {

  dbMaterielClassify.find({userId: req.session.userId},(err, data) => {
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

//删除物料分类节点
exports.delMaterielClassify = (req, res, next) => {

  dbMaterielClassify.remove({_id:req.body._id},(err) => {
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

