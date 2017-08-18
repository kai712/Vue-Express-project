<template>
    <div class="container">
        <div class="form">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="username">
              <el-input v-model.number="ruleForm2.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：">
              <el-input v-model="ruleForm2.orgName"
                        @keyup.enter.native="keySubmit"></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
              <el-button type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
              <router-link to="/"><el-button>已有账号，去登录</el-button></router-link>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import { pRegister } from '../api/user'
    export default {
        name: 'register',
      data() {
        const checkUsername = (rule, value, callback) => {
          const strExp=/^[A-Za-z0-9]+$/;
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }
          setTimeout(() => {
            if (strExp.test(value)) {
              callback();
            } else {
              callback(new Error('用户名必须由字母和数字组成'));
            }
          }, 1000);
        };
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        const validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
            username: '',
            orgName: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            username: [
              { validator: checkUsername, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              pRegister(this.ruleForm2,this)
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
