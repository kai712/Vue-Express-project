<template>
  <div class="EContainer">
    <div :id="data.id" class="comBox"></div>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'echartBar',
    props:[
      'data'
    ],
    mounted() {
      this.drawLine(this.data);
    },
    methods: {
      drawLine(data) {
        let myChart = echarts.init(document.getElementById(data.id))
        myChart.setOption({
          title: { text: data.title },
          tooltip: {},
          xAxis: {
            data: data.xAxis
          },
          yAxis: {},
          series: [{
            name: data.yName,
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ff4949'
              },
              emphasis: {
                color: '#ff6d6d'
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
