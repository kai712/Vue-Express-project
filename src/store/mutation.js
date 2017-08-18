import * as types from './mutationType'

const mutations = {
  [types.SET_PURCHASE_NOTE_COUNT](state, data){
    state.purchaseNoteCount = data
  },
  [types.SET_TENDER_COUNT](state, data){
    state.tenderCount = data
  },
  [types.SET_RECEIVING_COUNT](state, data){
    state.receivingCount = data
  },
  [types.SET_S_ORDER_COUNT_DATA](state, data){
    state.sOrderCountData = [];
    state.SOrderDateData = [];
    data.map(item => {
      state.sOrderCountData.push(item.val);
      state.SOrderDateData.push(item.date);
    })
  },
  [types.SET_S_ORDER_PRICE_DATA](state, data){
    state.SOrderPriceData = [];
    data.map(item => {
      state.SOrderPriceData.push(item.price);
    })
  },
  [types.SUB_S_ORDER_COUNT_DATA](state){
    const i = state.sOrderCountData.length-1;
    state.sOrderCountData[i]++;
  },
  [types.ADD_S_ORDER_PRICE_DATA](state, price){
    const i = state.SOrderPriceData.length-1;
    state.SOrderPriceData[i] += price;
  },
  [types.CHANGE_IS_SHOW_ECHARTS](state){
    state.isShowEcharts = !state.isShowEcharts
  },
  [types.CHANGE_CHECKING_ROUTE](state, route){
    state.checkingRoute = route
  }
}

export default mutations
