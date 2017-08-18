import { post } from '../index';

//获取采购单列表
export function getPurchaseOrder(that, data) {
  post('/api/getPurchaseOrder', data).then((res) => {
    if( res.result === 1 ){
      that.listData = res.data.rows;
      that.total = res.data.total;
    }else if( res.result === 0 ) {
      that.$message.error( res.message );
    }
  })
}

