<template>
    <div class="subContainer">
      <div class="search">
        <el-input placeholder="请输入物料名称" size="small"
                  v-model="name"
                  class="searchInput"
                  @keyup.enter.native="handleSearchClick">
          <el-button slot="append" icon="search" @click="handleSearchClick"></el-button>
        </el-input>
      </div>
      <el-table
        ref="multipleTable"
        :data="listData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        row-key='_id'
        @selection-change="handleCheckChange">
        <el-table-column
          type="selection"
          width="55"
          reserve-selection>
        </el-table-column>
        <el-table-column
          label="物料名称"
          width="300">
          <template scope="scope">
            <div class="name">
              <img :src="scope.row.imgUrls.length !==0?(imgPort+scope.row.imgUrls[0]):'/static/img/03.jpg'" alt="">
              <div class="title">
                <strong>{{ scope.row.Name }}</strong>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Code"
          label="物料编码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="需求量"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.quality }}  {{ scope.row.Unit }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3, 5, 10]"
          :page-size="page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="foot">
        <el-button type="primary" @click="handleNext">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import { getMateriel } from '../../../../api/materiel'
  import { imgPort } from '../../../../../static/script/port'
  export default {
    name: 'checkMateriel',
    data () {
      return {
        //服务器静态资源端口
        imgPort:imgPort,
        name: '',
        //分页
        pageIndex: 1,
        total: null,
        page: 3,
        listData: [],
        multipleSelection: [],
      }
    },
    methods: {
      //切换选中状态
      handleCheckChange(selection){
        this.multipleSelection = selection;
      },
      //搜索
      handleSearchClick(){
        getMateriel(this, { pageIndex: this.pageIndex, page: this.page, state: true, Name: this.name });
      },
      //====分页 =》 修改每页显示条数
      handleSizeChange(val) {
        if(this.page !== val&&val<=this.total){
          getMateriel(this, { pageIndex: this.pageIndex, page: val, state: true });
          this.page = val;
        }
      },
      //====分页 =》 翻页
      handleCurrentChange(val) {
        if(this.pageIndex !== val){
          getMateriel(this, { pageIndex: val, page: this.page, state: true });
          this.pageIndex = val;
        }
      },
      //下一步
      handleNext(){
        console.log('11')
        this.$emit('checkMateriel',this.multipleSelection)
      }
    },
    mounted(){
      getMateriel(this, { pageIndex: this.pageIndex, page: this.page, state: true })
    }
  }
</script>

<style lang="scss" scoped>
.subContainer {

  .search {
    width: 260px;
    margin: 20px 0 10px;
  }

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

  .el-pagination {
    text-align: center;
    margin: 20px 0 10px;
  }

  .foot {
    text-align: right;
  }
}
</style>
