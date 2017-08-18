<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-input placeholder="请输入订单号" size="small"
                  v-model="form.orderNum" class="searchInput">
          <el-select v-model="form.orderState" slot="prepend" clearable placeholder="订单状态" class="searchSelect">
            <el-option label="待发货" :value='0'></el-option>
            <el-option label="待收货" :value='1'></el-option>
            <el-option label="已收货" :value='2'></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="handleSearchClick"></el-button>
        </el-input>
      </div>
      <strong class="seniorSearch">
        <el-button type="text" @click="dialogFormVisible = true">高级搜索</el-button>
        <el-dialog title="高级搜索" :visible.sync="dialogFormVisible" class="alSenior">
          <el-form :model="form">
            <el-form-item label="产品名称" label-width="120px">
              <el-input v-model="form.productName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" label-width="120px">
              <el-input v-model="form.supplierName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" label-width="120px">
              <el-date-picker
                v-model="form.setOrderDate"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </strong>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="产品名称"
          width="300">
          <template scope="scope">
            <div class="name">
              <img :src="scope.row.imgUrls.length !==0?(imgPort+scope.row.imgUrls[0]):'/static/img/03.jpg'" alt="">
              <div class="title">
                <strong>{{ scope.row.productName }}</strong>
                <span>订单号:{{ scope.row.orderNum }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="下单时间"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.setOrderDate.substring(0,10) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="数量"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.quality }}  {{ scope.row.Unit }}
          </template>
        </el-table-column>
        <el-table-column
          label="总价"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.price*scope.row.quality }}
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          show-overflow-tooltip>
          <template scope="scope">
            <strong v-if="scope.row.orderState===0" class="color-normal">
              待发货
            </strong>
            <strong v-else-if="scope.row.orderState===1" class="color-danger">
              待收货
            </strong>
            <strong class="color-success" v-else>
              已收货
            </strong>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="scope">
            <el-button
              size="small"
              type="primary"
              v-if="scope.row.orderState===1"
              @click="handleConfirm(scope.row._id)">确认收货</el-button>
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.orderState===2"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30]"
          :page-size="page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { post } from '../../../api'
  import { getOrder } from '../../../api/order'
  import { imgPort } from '../../../../static/script/port'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'OrderList',
    data () {
      return {
        //服务器静态资源端口
        imgPort:imgPort,
        //列表搜索
        dialogFormVisible: false,
        form: {
          orderNum: '',
          productName: '',
          setOrderDate: [],
          orderState: '',
          supplierName: '',
        },
        //列表数据
        listData: null,
        //分页
        pageIndex: 1,
        total: null,
        page: 10,
      }
    },
    computed: {
      ...mapGetters([
        'receivingCount'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_RECEIVING_COUNT'
      ]),
      //删除
      handleDelete(id){
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          post('/api/delOrder', {id: id}).then((res) => {
            if( res.result === 1 ) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              getOrder(this)
            }else {
              this.$message.error(res.message);
            }
          })
        })
      },

      //确认收货
      handleConfirm(id){
        this.$confirm('确定已经收到产品, 确认收货吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          post('/api/confirmOrder', {_id: id}).then((res) => {
            if( res.result === 1 ) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              let receivingCount = this.receivingCount-1;
              this.SET_RECEIVING_COUNT(receivingCount);
              getOrder(this)
            }else {
              this.$message.error(res.message);
            }
          })
        })
      },

      //开始搜索
      handleSearchClick(){
        let data = {};
        Object.assign(data, this.form);
        Object.keys(this.form).forEach(key => this.form[key]='');
        getOrder(this, data)
      },

      //====分页 =》 修改每页显示条数
      handleSizeChange(val) {
        if(this.page !== val&&val<=this.total){
          getOrder(this, { page: val });
          this.page = val
        }
      },

      //====分页 =》 翻页
      handleCurrentChange(val) {
        if(this.pageIndex !== val){
          getOrder(this, { pageIndex: val, page: this.page });
          this.pageIndex = val;
        }
      }
    },
    mounted(){
      getOrder(this)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../static/styles/conmon";
  .container {
    width: 100%;
    height: auto;
    position: relative;
    background: #f2f2f2;

    .header {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      padding: 15px 20px;
      box-sizing: border-box;
      background: #fff;

      .search {
        width: 420px;
        float: left;

        .searchSelect {
          width: 120px;
        }
      }

      .seniorSearch {
        float: left;
        line-height: 30px;
        margin-left: 20px;
        font-weight: 400;

        .alSenior {
          width: 870px;
          left: 50%;
          margin-left: -435px;

          .el-input, .el-input__inner {
            width: 214px;
            display: inline-block;
          }
        }
      }

      .searchBtn {
        height: 30px;
        float: right;
        margin-left: 20px;
      }
    }

    .content {
      padding-bottom: 20px;
      background: #fff;

      .name {
        padding-top: 5px;
        padding-bottom: 5px;
        &:after {
          content: "\0020";
          display: block;
          height: 0;
          clear: both;
        }

        img {
          display: block;
          float: left;
          max-width: 60px;
          max-height: 80px;
          cursor: pointer;
        }

        .title {
          float: left;
          margin-left: 10px;
          width: 193px;

          strong {
            max-height: 50px;
            width: 100%;
            overflow: hidden;
            display: block;
          }

          span {
            font-size: 12px;
            color: #97a8be;
            display: block;
            max-height: 20px;
            overflow: hidden;
          }
        }
      }

      .pageBox {
        margin-top: 20px;

        .el-pagination {
          text-align: center;
        }
      }
    }

    .ctrBox {
      width: 100%;
      height: 60px;
      margin-bottom: 1px;
      padding: 15px 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      background: #fff;

      .closeCtrBoxBtn {
        cursor: pointer;

        &:hover {
          color: #20a0ff;
        }
      }
    }

    .color-normal {
      color: $color-normal;
    }
    .color-danger {
      color: $color-danger;
    }
    .color-success {
      color: $color-success;
    }

    .slide-fade-enter-active {
      transition: all .2s ease;
    }
    .slide-fade-leave-active {
      transition: all .1s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active for <2.1.8 */ {
      transform: translateX(-10px);
      opacity: 0;
    }
  }
</style>
