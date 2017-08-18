const state = {
  //待处理采购单个数
  purchaseNoteCount: 0,
  //待处理招标个数
  tenderCount: 0,
  //待处理待收货个数
  receivingCount: 0,

  //本周订单
  sOrderCountData: [],
  //本周订单金额
  SOrderPriceData: [],
  //日期
  SOrderDateData: [],
  isShowEcharts: false,
  //动态指定路由与左侧导航同步
  checkingRoute : 'cMain'
}

export default state
