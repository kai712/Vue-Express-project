<template>
  <div class="subContainer">
    <div class="search">
      <el-input placeholder="请输入供应商名称" size="small"
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
        prop="orgName"
        label="供应商名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="label"
        label="所属分类"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="name"
        label="联系人"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="pageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15]"
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
  import { getSupplier } from '../../../../api/supplier'
  export default {
    name: 'checkSupplier',
    data () {
      return {
        name: '',
        //分页
        pageIndex: 1,
        total: null,
        page: 5,
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
        getSupplier(this, { pageIndex: this.pageIndex, page: this.page, state: true, Name: this.name });
      },
      //====分页 =》 修改每页显示条数
      handleSizeChange(val) {
        if(this.page !== val&&val<=this.total){
          getSupplier(this, { pageIndex: this.pageIndex, page: val, state: true });
          this.page = val;
        }
      },
      //====分页 =》 翻页
      handleCurrentChange(val) {
        if(this.pageIndex !== val){
          getSupplier(this, { pageIndex: val, page: this.page, state: true });
          this.pageIndex = val;
        }
      },
      //下一步
      handleNext(){
        console.log('11')
        this.$emit('checkSupplier',this.multipleSelection)
      }
    },
    mounted(){
      getSupplier(this, { pageIndex: this.pageIndex, page: this.page, state: true })
    }
  }
</script>

<style lang="scss" scoped>
  .subContainer {

    .search {
      width: 260px;
      margin: 20px 0 10px;
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
