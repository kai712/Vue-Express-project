<template>
  <div class="container">
    <div class="content">
      <img src="/static/img/404.jpg" alt="">
      <el-button type="primary" @click="handleSelectMenu()">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Miss',
    methods: {
      handleSelectMenu(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;

  .content {
    width: 480px;
    height: 240px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -240px;
    text-align: center;
  }
}
</style>
