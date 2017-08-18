<template>
  <div class="EContainer">
    <div :id="data.id" class="comBox"></div>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'echartLine',
    props:[
      'data'
    ],
    mounted() {
      this.drawLine(this.data);
    },
    methods: {
      drawLine(data) {
        let myChart = echarts.init(document.getElementById(data.id));
        // 绘制图表
        myChart.setOption({
          title: { text: data.title },
          tooltip: {},
          xAxis: {
            data: data.xAxis,
            axisPointer: {
              show: true
            }
          },
          yAxis: {},
          series: [{
            name: data.yName,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ff4949',
                lineStyle: {
                  color: '#ff4949',
                  width: 2
                }
              }
            },
            data: data.yAxis
          }]
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.EContainer {
  width: 100%;

  .comBox {
    width: 100%;
    height: 500px;
  }
}
</style>
