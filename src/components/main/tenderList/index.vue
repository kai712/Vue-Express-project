<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-input placeholder="请输入招标标题" size="small"
                  v-model="form.Title" class="searchInput">
          <el-button slot="append" icon="search" @click="handleSearchClick"></el-button>
        </el-input>
      </div>
      <strong class="seniorSearch">
        <el-button type="text" @click="dialogFormVisible = true">高级搜索</el-button>
        <el-dialog title="高级搜索" :visible.sync="dialogFormVisible" class="alSenior">
          <el-form :model="form">
            <el-form-item label="发布时间" label-width="120px">
              <el-date-picker
                v-model="form.issueDate"
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
      <div class="searchBtn" @click="dialogAddMaterielVisible = true">
        <el-button type="primary" size="small">
          <i class="el-icon-plus"></i>
          发布全局招标
        </el-button>
      </div>
      <el-dialog title="发布全局招标" :visible.sync="dialogAddMaterielVisible" class="add-materiel" @close="handleAddFormClose">
        <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
          <input type="hidden" v-model="addForm.CategoryId">
          <input type="hidden" v-model="addForm.label">
          <el-form-item label="标题" prop="Title">
            <el-input v-model="addForm.Title"></el-input>
          </el-form-item>
          <el-form-item label="需求量">
            <el-input v-model="addForm.quality"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="addForm.Unit"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="addForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="Mobile">
            <el-input v-model="addForm.Mobile"></el-input>
          </el-form-item>
          <el-form-item label="产品图片">
            <el-upload
              action="/api/upload"
              list-type="picture-card"
              :on-success="uploadSuccess"
              :on-remove="removeUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addForm.remark" :rows= 3></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')">重 置</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="标题"
          width="300">
          <template scope="scope">
            <div class="name">
              <img :src="scope.row.imgUrls.length !==0?(imgPort+scope.row.imgUrls[0]):'/static/img/03.jpg'" alt="">
              <div class="title">
                <strong>{{ scope.row.Title }}</strong>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="需求量"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.quality }}{{ scope.row.Unit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="Mobile"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="发布时间"
          show-overflow-tooltip>
          <template scope="scope">
            {{ scope.row.issueDate.substring(0,10) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
          min-width="240">
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template scope="scope">
            <div class="mar"></div>
            <el-badge :value="scope.row.quotationNum">
              <el-button
                size="small"
                type="primary"
                :disabled="scope.row.quotationNum===0?true:false"
                @click="handleLookQuotation(scope.row)">查看投标</el-button>
            </el-badge>
            <div class="mar"></div>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看投标-->
      <el-dialog title="投标详情" :visible.sync="isShowLookOffer">
        <el-table :data="lookOffer">
          <el-table-column property="supplierName" label="供应商名称" width="200"></el-table-column>
          <el-table-column property="price" label="所报单价" width="150"></el-table-column>
          <el-table-column property="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="primary"
                v-if="scope.row.price"
                @click="handleCreateOrder(scope.row)">生成订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
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
  import { post } from '../../../api/index'
  import { getTenderOrder } from '../../../api/tender'
  import { imgPort } from '../../../../static/script/port'
  import { mobile } from '../../../../static/script/rules';
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'purchaseList',
    data () {
      return {
        //服务器静态资源端口
        imgPort:imgPort,
        //列表搜索
        dialogFormVisible: false,
        form: {
          Title: '',
          issueDate: ''
        },
        //列表数据
        listData: null,
        //分页
        pageIndex: 1,
        total: null,
        page: 10,
        //查看报价
        isShowLookOffer: false,
        lookOffer: [],
        //生成订单
        orderData: {
          supplierId: '',
          price: '',
          quality: '',
          Unit: '',
          consignee: '',
          mobile: '',
          supplierName: '',
          productName: '',
          imgUrls: []
        },
        customerId: '',

        //新增
        dialogAddMaterielVisible: false,
        //新增 => 表单验证
        addForm: {
          Title: '',
          quality: '',
          Unit: '',
          Mobile: '',
          remark: '',
          imgUrls: [],
          Name: ''
        },
        rules: {
          Title: [
            { required: true, message: "请输入标题！", trigger: 'blur' }
          ],
          Mobile: [
            { validator: mobile, trigger: 'blur' },
            { required: true, message: "请输入手机号码", trigger: 'blur' }
          ]
        },
        //上传产品图片
        dialogImageUrl: '',
        dialogVisible: false

      }
    },
    computed: {
      ...mapGetters([
        'tenderCount'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_TENDER_COUNT',
        'SUB_S_ORDER_COUNT_DATA',
        'ADD_S_ORDER_PRICE_DATA'
      ]),
      //新增 =》表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //新增 ==》 弹层关闭后回调 表单重置
      handleAddFormClose(){
        Object.keys(this.addForm).forEach((key) => {
          if(typeof (this.addForm[key])==='string'){
            this.addForm[key] = ''
          }else if(typeof (this.addForm[key])==='object'){
            this.addForm[key] = []
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
            post('/api/editTenderOrder', this.addForm).then((res) => {
              if( res.result === 1 ) {
                this.$message({
                  message: res.message,
                  type: 'success',
                  duration: 1000
                });
                this.dialogAddMaterielVisible = false;
                getTenderOrder(this);
              }else {
                this.$message.error(res.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      //查看报价
      handleLookQuotation(row){
        console.log(row);
        this.isShowLookOffer = true;
        this.lookOffer = row.Items;
        this.orderData.quality = row.quality;
        this.orderData.Unit = row.Unit;
        this.orderData.consignee = row.Name;
        this.orderData.mobile = row.Mobile;
        this.orderData.productName = row.Title;
        this.orderData.imgUrls = row.imgUrls;
        this.customerId = row._id;
      },
      //生成订单
      handleCreateOrder(row){
        this.$confirm('确定要生成订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.orderData.supplierId = row.supplierId;
          this.orderData.price = row.price;
          this.orderData.supplierName = row.supplierName;
          post('/api/tenCreateOrder', {orderData: this.orderData,id: this.customerId}).then((res) => {
            if( res.result === 1 ) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              this.isShowLookOffer = false;
              let tenderCount = this.tenderCount-1;
              this.SET_TENDER_COUNT(tenderCount);
              this.SUB_S_ORDER_COUNT_DATA();
              this.ADD_S_ORDER_PRICE_DATA(this.orderData.price*this.orderData.quality);
              getTenderOrder(this)
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
        getTenderOrder(this, data)
      },

      //====分页 =》 修改每页显示条数
      handleSizeChange(val) {
        if(this.page !== val&&val<=this.total){
          getTenderOrder(this, { page: val });
          this.page = val
        }
      },

      //====分页 =》 翻页
      handleCurrentChange(val) {
        if(this.pageIndex !== val){
          getTenderOrder(this, { pageIndex: val, page: this.page });
          this.pageIndex = val;
        }
      }
    },
    mounted(){
      getTenderOrder(this);
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
        width: 300px;
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

        .addDialogHeader {
          width: 80%;
          margin: 0 auto 20px;
        }
      }

      .perfectInfor {
        margin-top: 40px;
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

      .mar {
        width: 100%;
        height: 10px;
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
