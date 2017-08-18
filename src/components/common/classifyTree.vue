<template>
  <div class="containers" @click.stop="handleShowClick">
    {{ label }}
    <div class="icon">
      <i class="el-icon-caret-bottom"></i>
    </div>
    <div class="treeBox" :class="active">
      <el-tree
        :data="classifyListData"
        :props="defaultProps"
        accordion
        v-if="aa"
        @node-click="handleClassifyNodeClick">
      </el-tree>
    </div>
  </div>
</template>

<script>
  import { getSupplierClassify } from '../../api/supplier'
  export default {
    name: 'classifyTree',
    data () {
        return {
          //供应商分类  ===》
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          //供应商分类  ===》 数据是否加载完成
          aa: false,
          act: false
        }
    },
    props:[
      'message',
      'data'
    ],
    computed: {
      //供应商分类下拉树数据
      classifyListData(){
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
      },
      active(){
        return this.act?'active':''
      },
      label(){
        if(typeof (this.message)==='boolean'){
          return '';
        }else {
          return this.message;
        }
      }
    },
    methods: {
      //点击供应商分类节点
      handleClassifyNodeClick(data) {
        this.$emit("handleClick",data._id,data.label);
        this.label = data.label;
      },
      handleShowClick(){
        this.act = !this.act
      }
    },
    mounted(){
      //供应商分类  ===》 获取节点数据
      this.aa = true;
      document.onclick = () => {
        this.act = false
      }
    }
  }
</script>

<style lang="scss" scoped>
.containers {
  width: 214px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  padding-left: 10px;
  box-sizing: border-box;
  color: #1f2d3d;
  background: #fff;

  .icon {
    color: #bfcbd9;
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }

  .treeBox {
    width: 214px;
    position: absolute;
    background: #FFF;
    border: 1px solid #d1dbe5;
    box-sizing: border-box;
    left: 0;
    top: 38px;
    height: 0;
    opacity: 0;
    transition: all .1s ease-in;
    overflow: hidden;
    overflow-y: scroll;
    z-index: 999;

    .el-tree {
      border: none;
    }
  }

  .treeBox.active {
    height: 200px;
    opacity: 1;
  }
}
</style>
