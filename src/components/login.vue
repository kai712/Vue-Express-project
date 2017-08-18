<template>
  <div class="container">
    <div class="form">
      <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model.number="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"
                    @keyup.enter.native="keySubmit"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="submitForm('ruleForm2')">立即登录</el-button>
          <router-link to="/register">
            <el-button>没有账号，去注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { pLogin } from '../api/user'
  export default {
    name: 'login',
    data() {
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          username: ''
        }
      };
    },
    methods: {
        //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            pLogin(this.ruleForm2,this)
          } else {
            return false;
          }
        });
      },
      //回车键提交
      keySubmit(){
        this.submitForm('ruleForm2')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    padding: 0.1px;
    background: url("../../static/img/register-bg.jpg") no-repeat;
    background-size: cover;

    .form {
      width: 380px;
      height: auto;
      background: rgba(255,255,255,0.4);
      margin: 150px auto;
      padding: 50px 30px;
    }
  }
</style>
