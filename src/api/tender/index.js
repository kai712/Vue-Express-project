import { post } from '../index';

//获取招标列表
export function getTenderOrder(that, data) {
  post('/api/getTenderOrder', data).then((res) => {
    if( res.result === 1 ){
      that.listData = res.data.rows;
      that.total = res.data.total;
    }else if( res.result === 0 ) {
      that.$message.error( res.message );
    }
  })
}
