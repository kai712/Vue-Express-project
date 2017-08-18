<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-input placeholder="请输入物料名称" size="small"
                  v-model="form.Name" class="searchInput">
          <el-select v-model="form.state" slot="prepend" clearable placeholder="物料状态" class="searchSelect">
            <el-option label="禁用" :value='false'></el-option>
            <el-option label="启用" :value='true'></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="handleSearchClick"></el-button>
        </el-input>
      </div>
      <strong class="seniorSearch">
        <el-button type="text" @click="dialogFormVisible = true">高级搜索</el-button>
        <el-dialog title="高级搜索" :visible.sync="dialogFormVisible" class="alSenior">
          <el-form :model="form">
            <el-form-item label="所属分类" label-width="120px">
              <ClassifyTree
                v-on:handleClick="searchCheckClassify"
                :message="isShowClassifyCom"
                :data="data"/>
            </el-form-item>
            <el-form-item label="物料编码" label-width="120px">
              <el-input v-model="form.Code" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </strong>
      <div class="searchBtn" @click="addFormFunc">
        <el-button type="primary" size="small">
          <i class="el-icon-plus"></i>
          新增物料
        </el-button>
      </div>
      <el-dialog title="新增物料" :visible.sync="dialogAddMaterielVisible" class="add-materiel" @close="handleAddFormClose">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
          <input type="hidden" v-model="addForm.CategoryId">
          <input type="hidden" v-model="addForm.label">
          <el-form-item label="物料名称" prop="Name">
            <el-input v-model="addForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="物料编码" prop="Code">
            <el-input v-model="addForm.Code"></el-input>
          </el-form-item>
          <el-form-item label="物料分类">
            <ClassifyTree
              v-on:handleClick="checkClassify"
              :message="textClassifyCom"
              :data="data"/>
          </el-form-item>
          <el-form-item label="需求量">
            <el-input v-model="addForm.quality"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="addForm.Unit"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch on-text="启用" off-text="禁用" v-model="addForm.state"></el-switch>
          </el-form-item>
          <el-form-item label="产品图片">
            <el-upload
              action="/api/upload"
              list-type="picture-card"
              :on-success="uploadSuccess"
              :on-remove="removeUpload"
              :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="用途以及备注">
            <el-input type="textarea" v-model="addForm.remark" :rows= 3></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')">重 置</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <div class="searchBtn" @click="exportEcl">
        <el-button type="primary" size="small">
          导出excel
        </el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
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
          prop="label"
          label="所属分类"
          show-overflow-tooltip>
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
        <el-table-column
          prop="remark"
          label="用途与备注"
          show-overflow-tooltip
          min-width="240">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
          <template scope="scope">
            <el-switch
              v-model="scope.row.state"
              on-text=""
              off-text=""
              @change="changeState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="small"
              type="danger"
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
    <transition name="slide-fade">
      <div class="ctrBox" v-if="dialogCtrBox">
        <i class="el-icon-close closeCtrBoxBtn" @click="handleDeselect"></i>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>已选择<span style="color: red;font-weight: 700">{{ checkItems.length }}</span>项</span>
        &nbsp;&nbsp;&nbsp;&nbsp;丨&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" size="small" class="batchDeleteBtn" @click="handleDelete(null)">
          批量删除
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script>
  import ClassifyTree from '../../common/classifyTree'
  import { post } from '../../../api'
  import { getMaterielClassify, getMateriel } from '../../../api/materiel'
  import { imgPort } from '../../../../static/script/port'

  export default {
    name: 'materielList',
    components: {
      ClassifyTree
    },
    data () {
      return {
        //服务器静态资源端口
        imgPort:imgPort,
        //分类数据
        data: [],
        //选中后头部显示菜单栏
        dialogCtrBox: false,
        //列表搜索
        dialogFormVisible: false,
        form: {
          Name: '',
          CategoryId: '',
          Code: '',
          state: '',
        },
        //判断高级搜索下的分类树是否需要初始化
        isShowClassifyCom : false,
        //列表数据
        listData: null,
        //选中列表de 数据
        checkItems: [],
        //分页
        pageIndex: 1,
        total: null,
        page: 10,

        //新增
        dialogAddMaterielVisible: false,
        //新增 =》 给分类树赋值
        textClassifyCom: '',
        //新增 => 表单验证
        addForm: {
          CategoryId: '',
          label: '',
          Name: '',
          Code: '',
          quality: 0,
          Unit: '',
          state: true,
          remark: '',
          imgUrls: []
        },
        rules: {
          Name: [
            { required: true, message: "请输入物料名称！", trigger: 'blur' }
          ],
          Code: [
            { required: true, message: "请输入物料编码！", trigger: 'blur' }
          ]
        },
        //上传产品图片
        dialogImageUrl: '',
        dialogVisible: false

      }
    },
    computed: {
      //修改  =》  产品图片赋值
      fileList(){
        let datas = [];
        this.addForm.imgUrls.map(item => {
          let data = {};
          data.name = item;
          data.url = imgPort+item;
          data.status = 'finished';
          datas.push(data)
        })
        return datas
      }
    },
    methods: {
      //选择供应商分类
      checkClassify(id, label){
        this.addForm.CategoryId = id;
        this.addForm.label = label;
      },

      //新增 =》弹出表单
      addFormFunc(){
        this.textClassifyCom = '';
        this.dialogAddMaterielVisible = true;
      },

      //新增 =》表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //新增和修改 ==》 弹层关闭后回调 表单重置
      handleAddFormClose(){
        Object.keys(this.addForm).forEach((key) => {
          if(typeof (this.addForm[key])==='string'){
            this.addForm[key] = ''
          }else if(typeof (this.addForm[key])==='object'){
            this.addForm[key] = []
          }else if(typeof (this.addForm[key])==='boolean'){
            this.addForm[key] = false
          }else if(typeof (this.addForm[key])==='number'){
            this.addForm[key] = 0
          }
        });
      },
      //新增  =》  上传产品图片成功
      uploadSuccess(file) {
        this.addForm.imgUrls.push(file);
      },
      //新增  =》  删除产品图片
      removeUpload(file){
        this.addForm.imgUrls.map((v, k) => {
          if(v === file.name){
            this.addForm.imgUrls.splice(k, 1)
          }
        })
      },
      //新增 =》表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            post('/api/editMateriel', this.addForm).then((res) => {
              if( res.result === 1 ) {
                this.$message({
                  message: res.message,
                  type: 'success',
                  duration: 1000
                });
                this.dialogAddMaterielVisible = false;
                getMateriel(this);
                this.textClassifyCom = this.addForm.label
              }else {
                this.$message.error(res.message);
              }
            })
          } else {
            return false;
          }
        });
      },

      //修改
      handleEdit(data){
        this.dialogAddMaterielVisible = true;
        this.textClassifyCom = data.label;
        Object.assign(this.addForm, data);
      },

      //删除
      handleDelete(id){
        let ids = [];
        if(id){
          ids.push(id)
        }else {
          this.checkItems.map((k) => {
            ids.push(k._id)
          })
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          post('/api/delMateriel', {ids: ids}).then((res) => {
            if( res.result === 1 ) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              getMateriel(this)
            }else {
              this.$message.error(res.message);
            }
          })
        })
      },

      //变更物料状态
      changeState(row){
        post('/api/pendMateriel', {_id: row._id,state:!row.state}).then((res) => {
          if( res.result === 1 ) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1000
            });
          }else {
            this.$message.error(res.message);
            row.state = !row.state
          }
        })
      },

      //选中列表数据
      handleSelectionChange(k){
        this.checkItems = k;
        k.length === 0 ? this.dialogCtrBox=false : this.dialogCtrBox=true;
      },

      //取消列表数据选择
      handleDeselect(){
        this.dialogCtrBox=false;
        this.$refs.multipleTable.clearSelection();
      },

      //高级搜索  =》  选择供应商所属分类
      searchCheckClassify(id, label){
        this.form.CategoryId = id;
      },

      //开始搜索
      handleSearchClick(){
        let data = {};
        Object.assign(data, this.form);
        Object.keys(this.form).forEach(key => this.form[key]='');
        getMateriel(this, data)
      },

      //====分页 =》 修改每页显示条数
      handleSizeChange(val) {
        if(this.page !== val&&val<=this.total){
          getMateriel(this, { page: val });
          this.page = val
        }
      },

      //====分页 =》 翻页
      handleCurrentChange(val) {
        if(this.pageIndex !== val){
          getMateriel(this, { pageIndex: val, page: this.page });
          this.pageIndex = val;
        }
      },

      //导出excel
      exportEcl(){
        console.log('导出EXCEL')
      }
    },
    mounted(){
      getMateriel(this);
      getMaterielClassify(this)
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

      .add-materiel {

        .el-input, .el-input__inner {
          width: 214px;
          display: inline-block;
        }
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
