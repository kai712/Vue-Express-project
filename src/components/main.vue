<template>
  <div id="app">
    <div class="loading" v-if="isShowLoading">
      <div class="cont">
        <img src="/static/img/loading.gif" alt="">
        <p>努力加载中...</p>
      </div>
    </div>
    <div class="slideBar">
      <div class="logo">
        <router-link to="/main/cMain">
          <img src="../../static/img/logo.png" alt=""
               @click="handleSelectMenu('cMain')">
        </router-link>
      </div>
      <div class="slideBarList">
        <el-menu router
                 unique-opened
                 theme="dark"
                 :default-active="checkingRoute"
                 @select="handleSelectMenu"
                 class="el-menu-vertical-demo">
          <el-menu-item index="cMain"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>物料管理</template>
            <el-menu-item index="materielList">物料清单</el-menu-item>
            <el-menu-item index="MaterialClassification">物料分类管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="purchaseOrder"><i class="el-icon-menu"></i>采购单</el-menu-item>
          <el-menu-item index="tenderList"><i class="el-icon-menu"></i>招标管理</el-menu-item>
          <el-menu-item index="orderList"><i class="el-icon-menu"></i>订单管理</el-menu-item>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-menu"></i>供应商管理</template>
            <el-menu-item index="supplierList">供应商列表</el-menu-item>
            <el-menu-item index="supplierClassification">供应商分类</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="user item">
          <el-dropdown menu-align="end" @command="logOff">
            <span class="el-dropdown-link">
              <icon name="user" scale="1.5" class="icon"></icon>
              <span style="display: inline-block">{{ username }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">账号信息</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog title="账号信息" :visible.sync="dialogFormVisible" class="alSenior">
            <el-form :model="form">
              <input type="hidden" v-model="form._id">
              <el-form-item label="用户名：" label-width="120px">
                <el-input v-model="form.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司名称：" label-width="120px">
                <el-input v-model="form.orgName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邀请码：" label-width="120px">
                <p>{{ form.code }}</p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="reviseUserInf">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="notification">
          <ul>
            <li>
              <router-link to="/main/purchaseOrder">
                <span @click="handleSelectMenu('purchaseOrder')">
                  <i class="el-icon-menu"></i>
                  采购单
                  <el-badge class="mark" :value="purchaseNoteCount" />
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/main/tenderList">
                <span @click="handleSelectMenu('tenderList')">
                  <i class="el-icon-menu"></i>
                  招标
                  <el-badge class="mark" :value="tenderCount" />
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/main/orderList">
                <span @click="handleSelectMenu('orderList')">
                  <i class="el-icon-menu"></i>
                  待收货
                  <el-badge class="mark" :value="receivingCount" />
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="routBox">
        <div class="content">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'vue-awesome/icons/user'
  import Icon from 'vue-awesome/components/Icon'
  import { pLogOff, isLogin, reviseUserInf } from '../api/user'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'main',
    components: {
      Icon
    },
    data(){
        return {
          dialogFormVisible: false,
          username: '',
          form: {
            username: '',
            orgName: '',
            _id: '',
            code: '',
          },
          isShowLoading: true
        }
    },
    computed: {
      ...mapGetters([
        'receivingCount',
        'purchaseNoteCount',
        'tenderCount',
        'checkingRoute'
      ])
    },
    methods: {
      ...mapMutations([
        'CHANGE_CHECKING_ROUTE',
        'CHANGE_IS_SHOW_ECHARTS'
      ]),
      ...mapActions([
        'getNews',
        'getStatisticsData'
      ]),
      //退出登录
      logOff(command){
        if(command === 'a'){
          this.dialogFormVisible = true;
        }else if(command === 'b'){
          this.CHANGE_IS_SHOW_ECHARTS();
          pLogOff(this)
        }
      },
      //修改账户信息
      reviseUserInf(){
        reviseUserInf(this.form, this);
      },
      handleSelectMenu(index){
        this.CHANGE_CHECKING_ROUTE(index)
      }
    },
    mounted(){
      isLogin(this);
      this.getNews();
      this.getStatisticsData();
      this.CHANGE_CHECKING_ROUTE(this.$route.name);
      this.$nextTick(() => {
        this.isShowLoading = false
      })
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    padding-left: 180px;
    box-sizing: border-box;

    .slideBar {
      position: fixed;
      left: 0;
      top: 0;
      width: 180px;
      height: auto;
      min-height: 100%;
      background: #324157;

      .logo {
        width: 100%;
        height: 63px;
        background: #1f2d3d;
        padding-top: 10px;
        box-sizing: border-box;

        img {
          display: block;
          margin: 0 auto;
        }
      }

      .el-submenu {

        .el-menu-item {
          min-width: 120px
        }
      }
    }

    .container {
      width: 100%;
      height: auto;
      min-height: 100%;

      .header {
        width: 100%;
        height: 63px;
        box-sizing: border-box;
        background: #fff;
        color: #333;
        border-top: 3px solid #324157;
        border-bottom: 1px solid #e2e2e2;

        .item {
          float: right;
          height: 63px;
          margin-right: 35px;
        }
        .user {
          font-size: 16px;
          line-height: 63px;
          cursor: pointer;

          .icon {
            margin-right: 8px;
            display: inline-block;
            float: left;
            margin-top: 18px;
          }

          .el-dropdown {
            color: #333;
          }
        }

        .notification {
          height: 60px;
          float: left;
          margin-left: 10px;

          li {
            width: 120px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            float: left;
            font-size: 14px;
            font-weight: 700;
            margin-right: 20px;
            &:hover {
              color: #20a0ff;
            }

            .mark {
              font-size: 12px;
            }
          }
        }
      }

      .routBox {
        padding: 10px;
        box-sizing: border-box;

        .content {
          background: #fff;
        }
      }
    }

    .loading {
      width: 100%;
      height: 100%;
      background: #fff;
      position: fixed;
      z-index: 999;
      left: 0;
      top: 0;

      .cont {
        width: 280px;
        height: 250px;
        position: absolute;
        left: 50%;
        margin-left: -140px;
        top: 50%;
        margin-top: -125px;

        p {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }

    .fade-enter-active, .slide-leave-active {
      transition: opacity .3s
    }
    .fade-enter, .slide-leave-to {
      opacity: 0
    }
  }
</style>
