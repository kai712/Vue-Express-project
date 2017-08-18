const dbTender = require('../../model/tender');
const dbOrder = require('../../model/order');
const async = require('async');
const generate = require('nanoid/generate');

//新增全局招标
exports.editTenderOrder = (req, res, next) => {

  const data = req.body;
  data.customerId = req.session.userId;
  data.issueDate = Date();
  data.customerName = req.session.orgName;

  dbTender.create(data, err => {
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

};

//获取全局招标列表
exports.getTenderOrder = (req, res, next) => {
  //当前页码
  const pageIndex = parseInt(req.body.pageIndex)-1 || 0;
  //每页显示条数
  const page = parseInt(req.body.page) || 10;
  const data = {};
  data.customerId = req.session.userId;

  if(req.body.Title !=='' && req.body.Title !== undefined){
    data.Title = new RegExp(req.body.Title,"i")
  }
  if(req.body.issueDate !=='' && req.body.issueDate !== undefined){
    data.$and = [{"issueDate":{"$gt":req.body.issueDate[0]}},{"issueDate":{"$lt":req.body.issueDate[1]}}];
  }

  async.parallel(
    [
      callback => {
        dbTender.find(data,(err, data) => {
          callback(err, data)
        }).limit(page).skip(pageIndex*page).sort({_id:-1});
      },
      callback => {
        dbTender.find(data,(err, data) => {
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
      results[0].forEach((v, k) => {
        let quotationNum = 0;
        v.Items.forEach(item => {
          if(item.price !== null && item.price !== ''){
            quotationNum++
          }
        });
        results[0][k].quotationNum = quotationNum;
      });
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

//生成订单
exports.tenCreateOrder = (req, res, next) => {

  const data = req.body.orderData;
  const id = req.body.id;
  data.customerId = req.session.userId;
  data.customerName = req.session.orgName;
  data.orderNum = generate('1234567890', 16);
  data.setOrderDate = Date();

  async.waterfall([
    callback => {
      dbOrder.create(data,function (err) {
        callback(err, 1);
      });
    },
    (aa,callback) => {
      if(aa===1){
        dbTender.remove({_id:id}, err => {
          callback(err, 1);
        });
      }else {
        callback(null, 0);
      }
    }
  ],(err, results) => {
    if (err) {
      res.json({
        result:0,
        message: '操作失败'
      });
      return
    }
    res.json({
      result:results,
      message: '恭喜您，已成功生成订单'
    })
  });

};


