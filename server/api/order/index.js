const dbOrder = require('../../model/order');
const async = require('async');

//获取订单列表
exports.getOrder = (req, res) => {
  //当前页码
  const pageIndex = parseInt(req.body.pageIndex)-1 || 0;
  //每页显示条数
  const page = parseInt(req.body.page) || 10;
  const data = {};
  data.customerId = req.session.userId;

  if(req.body.supplierName !=='' && req.body.supplierName !== undefined){
    data.supplierName = new RegExp(req.body.supplierName,"i")
  }
  if(req.body.productName !=='' && req.body.productName !== undefined){
    data.productName = new RegExp(req.body.productName,"i")
  }
  if(req.body.orderNum !=='' && req.body.orderNum !== undefined){
    data.orderNum = new RegExp(req.body.orderNum,"i")
  }
  if(req.body.orderState !=='' && req.body.orderState !== undefined){
    data.orderState = req.body.orderState
  }
  if(req.body.issueDate !=='' && req.body.issueDate !== undefined){
    data.$and = [{"issueDate":{"$gt":req.body.issueDate[0]}},{"issueDate":{"$lt":req.body.issueDate[1]}}];
  }

  async.parallel(
    [
      callback => {
        dbOrder.find(data,function (err, data) {
          callback(err, data)
        }).limit(page).skip(pageIndex*page).sort({_id:-1});
      },
      callback => {
        dbOrder.find(data,function (err, data) {
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

//删除订单
exports.delOrder = (req, res, next) => {

  if(req.body.id){
    dbOrder.remove({"_id":req.body.id},err => {
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

//确认收货
exports.confirmOrder = (req, res, next) => {
  if(req.body._id){
    dbOrder.update({_id:req.body._id},{"orderState":2},err => {
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
