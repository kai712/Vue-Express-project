const dbOrder = require('../../model/order');
const dbPurchaseOrder = require('../../model/purchaseOrder');
const dbTender = require('../../model/tender');
const async = require('async');

//获取消息中心
exports.getNews = (req, res, next) => {
  const id = req.session.userId;
  async.parallel(
    [
      callback => {
        dbOrder.count({customerId: id,orderState:1},(err, data) => {
          callback(err, data)
        });
      },
      callback => {
        dbPurchaseOrder.count({userId: id,quotationNum:{ "$gt":0}},(err, data) => {
          callback(err, data)
        });
      },
      callback => {
        dbTender.count({customerId: id,quotationNum:{ "$gt":0}},(err, data) => {
          callback(err, data)
        });
      }
    ],
    function(err, results) {
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
          receivingCount: results[0],
          purchaseNoteCount: results[1],
          tenderCount: results[2],
        }
      })
    }
  );
};

//获取统计数据
exports.getStatisticsData = (req, res, next) => {
  const id = req.session.userId;
  const date = [];
  const countData = [];
  const priceData = [];
  for(let i=0; i<7; i++){
    let item = {};
    let item_ = {};
    date.push(new Date(new Date()-24*i*60*60*1000));
    item.date = new Date(new Date()-24*i*60*60*1000).toLocaleDateString();
    item_.date = new Date(new Date()-24*i*60*60*1000).toLocaleDateString();
    item.val = 0;
    item_.price = 0;
    countData.push(item);
    priceData.push(item_);
  }
  dbOrder.find({customerId: id,$and: [{"setOrderDate":{"$gte":date[6]}},{"setOrderDate":{"$lte":date[0]}}]},(err, data) => {
    if(err){
      res.json({
        result:0,
        message: '数据加载失败，请刷新后重试'
      });
      return
    }
    data.map( item => {
      countData.map( (v, k)=> {
        if(v.date === item.setOrderDate.toLocaleDateString()){
          countData[k].val ++;
          priceData[k].price += parseInt(item.price)*item.quality
        }
      })
    });
    res.json({
      result:1,
      countData: countData.reverse(),
      priceData: priceData.reverse()
    })
  });

};

