<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="small" @click="addClassify">
        <i class="el-icon-plus"></i>
        新增一级分类
      </el-button>
    </div>
    <el-tree
      :data="listData"
      :props="defaultProps"
      node-key="_id"
      default-expand-all
      :expand-on-click-node="false"
      v-if="aa"
      :render-content="renderContent">
    </el-tree>
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" class="alSenior">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.label" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getSupplierClassify } from '../../../api/supplier'
  import { post } from '../../../api'
  let id = 1000;
  export default {
    name: 'supplierClassification',
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        //数据是否加载完成
        aa: false,
        //新增弹层
        dialogFormVisible: false,
        //新增节点表单
        form: {
          label: ''
        },
        //判断是否为新增顶级节点
        addData: null
      }
    },
    computed: {
      //节点数据
      listData(){
        let data = [];
        this.data.map((k) => {
          let id = k._id;
          let children = [];
          for(let i=0; i<this.data.length;i++){
            if(this.data[i].p_id===id){
              this.data[i].children = null;
              children.push(this.data[i]);
            }
          }
          if(children.length !== 0){
            k.children = children
          }
          if(k.p_id===''){
            data.push(k);
          }
        });
        return data
      }
    },
    methods: {
      //新增一级分类
      addClassify(){
        this.form.label = '';
        this.addData = null;
        this.dialogFormVisible = true;
      },
      //新增子分类
      append(store, data) {
        this.form.label = '';
        this.dialogFormVisible = true;
        this.addData = data;
      },
      //新增分类  =》 表单提交
      confirmForm(){
        let item;
        this.dialogFormVisible = false;
        if(this.addData){
          item = { p_id: this.addData._id, label: this.form.label };
        }else {
          item = { label: this.form.label };
        }
        post('/api/editSupplierClassify',item).then((res) => {
          if( res.result === 1 ) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1000
            });
            this.data.push(res.data);
          }else {
            this.$message.error(res.message);
          }
        })
      },
      //删除分类节点
      remove(store, data) {
        let id = data._id;
        if(data.children){
          this.$message({
            message: '节点下有子集，不能删除',
            type: 'warning',
            duration: 1000
          });
        }else {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            post('/api/delSupplierClassify', {_id: id}).then((res) => {
              if( res.result === 1 ) {
                this.data.map((item, index) => {
                  if(item._id===res._id){
                    getSupplierClassify(this)
                  }
                });
                this.$message({
                  message: res.message,
                  type: 'success',
                  duration: 1000
                });
              }else {
                this.$message.error(res.message);
              }
            })
          })
        }
      },
      //渲染分类节点
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="small" on-click={ () => this.append(store, data) }>新增子分类</el-button>
              <el-button size="small" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>);
      }
    },
    mounted(){
      getSupplierClassify(this);
    }
  }

</script>

<style lang="scss" scoped>
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
      border: 1px solid #e2e2e2;
    }

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
</style>
