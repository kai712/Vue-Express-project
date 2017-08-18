import * as types from './mutationType'
import { get } from '../api'

export const getNews = ({ commit }) => {
  get('/api/getNews').then(res => {
    if(res.result === 1) {
      commit(types.SET_RECEIVING_COUNT, res.data.receivingCount);
      commit(types.SET_PURCHASE_NOTE_COUNT, res.data.purchaseNoteCount);
      commit(types.SET_TENDER_COUNT, res.data.tenderCount);
    }
  })
}

export const getStatisticsData = ({ commit }) => {
  get('/api/getStatisticsData').then(res => {
    if(res.result === 1){
      commit(types.SET_S_ORDER_COUNT_DATA, res.countData);
      commit(types.SET_S_ORDER_PRICE_DATA, res.priceData);
      commit(types.CHANGE_IS_SHOW_ECHARTS);
    }
  });
}
