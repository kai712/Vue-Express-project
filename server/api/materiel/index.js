const dbMateriel = require('../../model/materiel');
const async = require('async');

//新增或修改物料
exports.editMateriel = (req, res, next) => {

  let data = {};
  data.userId = req.session.userId;
  if(req.body._id){
    data = req.body;
    dbMateriel.update({_id:req.body._id},data,err => {
      if (err){
        res.json({
          result:0,
          message: '操作失败，请重试'
        });
        return
      }
      res.json({
        result:1,
        message: '恭喜您，操作成功'
      });
    });
  }else {
    for(let k in req.body){
      if(k !== '_id'){
        data[k] = req.body[k]
      }
    }
    dbMateriel.create(data,err => {
      if (err) {
        res.json({
          result:0,
          message: '操作失败，请重试'
        });
        return
      }
      res.json({
        result:1,
        message: '恭喜您，操作成功'
      })
    });

  }

};

//获取物料列表
exports.getMateriel = (req, res) => {
  //当前页码
  const pageIndex = parseInt(req.body.pageIndex)-1 || 0;
  //每页显示条数
  const page = parseInt(req.body.page) || 10;

  const data = {};
  data.userId = req.session.userId;

  if(req.body.Name !=='' && req.body.Name !== undefined){
    data.Name = new RegExp(req.body.Name,"i")
  }
  if(req.body.Code !=='' && req.body.Code !== undefined){
    data.Code = new RegExp(req.body.Code,"i")
  }
  if(req.body.state !=='' && req.body.state !== undefined){
    data.state = req.body.state
  }
  if(req.body.CategoryId !=='' && req.body.CategoryId !== undefined){
    data.CategoryId = req.body.CategoryId
  }

  async.parallel(
    [
      callback => {
        dbMateriel.find(data,(err, data) => {
          callback(err, data)
        }).limit(page).skip(pageIndex*page).sort({_id:-1});
      },
      callback => {
        dbMateriel.find(data,(err, data) => {
          callback(err, data.length)
        });
      }
    ],
    (err, results) => {
      if(err){
        res.json({
          result:0,
          message: '数据加载失败，请刷新后重试'
        });
        return
      }
      res.json({
        result:1,
        data: {
          total: results[1],
          rows: results[0]
        }
      })
    }
  );
};

//删除物料
exports.delMateriel = (req, res, next) => {

  if(req.body.ids.length !== 0){
    dbMateriel.remove({"_id":{ $in: req.body.ids}},err => {
      if (err){
        res.json({
          result:0,
          message: '操作失败，请重试'
        });
        return
      }
      res.json({
        result:1,
        message: '恭喜您，操作成功'
      });
    });
  }

};

//变更物料状态
exports.pendMateriel = (req, res, next) => {
  if(req.body._id){
    dbMateriel.update({_id:req.body._id},{"state":req.body.state},err => {
      if (err){
        res.json({
          result:0,
          message: '操作失败，请重试'
        });
        return
      }
      res.json({
        result:1,
        message: req.body.state?'恭喜您，已成功启用该物料':'恭喜您，已成功禁用该物料'
      });
    });
  }

};
