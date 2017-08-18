<template>
    <div class="container">
      <div class="header">
        暂未开放，敬请期待！
      </div>
      <div class="mainTitle">
        报表统计
      </div>
      <div class="item" v-if="isShowEcharts">
        <EChartLine :data="orderCountData" />
      </div>
      <div class="item" v-if="isShowEcharts">
        <EChartBar :data="orderPriceData" />
      </div>

    </div>
</template>

<script>
  import EChartLine from './subpage/com-echart-line'
  import EChartBar from './subpage/com-echart-bar'
  import { mapGetters } from 'vuex'

  export default {
    name: 'cMain',
    components: {
      EChartLine,
      EChartBar
    },
    computed: {
      ...mapGetters([
        'sOrderCountData',
        'SOrderPriceData',
        'SOrderDateData',
        'isShowEcharts'
      ]),
      //订单数
      orderCountData(){
        return {
          id: 'orderCountId',
          title: '本周订单数',
          xAxis: this.SOrderDateData,
          yName: '下单数',
          yAxis: this.sOrderCountData
        }
      },
      //订单金额
      orderPriceData(){
        return {
          id: 'orderPriceId',
          title: '本周订单金额',
          xAxis: this.SOrderDateData,
          yName: '订单金额',
          yAxis: this.SOrderPriceData
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;

  .header {
    width: 100%;
    height: 200px;
    line-height: 200px;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    margin-bottom: 10px;
    background: #fff;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #999;
  }

  .mainTitle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 16px;
    border-bottom: 1px solid #e2e2e2;
    background: #fff;
    border-left: 3px solid #ff4949;
  }

  .item {
    width: 50%;
    float: left;
    padding: 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
  }
  &:after {
    clear:both;
    content:'';
    display:block;
    width:0;
    height:0;
    visibility:hidden;
  }
}
</style>
