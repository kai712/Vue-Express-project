import { post } from '../index'
//登录
export function pLogin(data, that) {
  post('/api/login', data).then((res) => {
    if( res.result === 1 ){
      that.$message({
        message: res.message,
        type: 'success',
        duration: 2000
      });
      that.$router.push('/main');
    } else {
      that.$message.error(res.message);
    }
  })
}

//退出登录
export function pLogOff(that) {
  post('/api/logOff').then((res) => {
    if( res.result === 1 ){
      that.$router.push('/');
    } else {
      that.$message.error('操作失败，请重试');
    }
  })
}

//验证是否登录
export function isLogin(that) {
  post('/api/isLogin').then((res) => {
    if( res.result === false ){
      that.$router.push('/');
    }else {
      that.username = that.form.username = res.username;
      that.form.orgName = res.orgName;
      that.form._id = res._id;
      that.form.code = res.code;
    }
  })
}

//修改账户信息
export function reviseUserInf(data, that) {
  that.$message({
    message: '暂不支持修改账户信息！',
    type: 'warning',
    duration: 1000
  });
  that.dialogFormVisible = false;
/*  post('/api/reviseUserInf',data).then((res) => {
    if( res.result === 1 ){
      that.$message({
        message: '恭喜您，修改成功',
        type: 'success',
        duration: 1000
      });
      that.dialogFormVisible = false;
      that.username = that.form.username = res.username;
      that.form.orgName = res.orgName
    } else {
      that.$message.error('修改失败，请重试');
    }
  })*/
}

//注册
export function pRegister(data,that) {
  post('/api/register', data).then((res) => {
    if( res.result === 0 ){
      that.$message({
        message: '该用户名已被注册',
        type: 'warning',
        duration: 1000
      });
    } else if( res.result === 1 ) {
      that.$message({
        message: '恭喜您，注册成功，1s后跳转到登录页',
        type: 'success',
        duration: 1000
      });
      let timer = setTimeout( () => {
        that.$router.push('/');
        clearTimeout(timer)
      },1000)
    }else {
      that.$message.error('注册失败，请重试');
    }
  })
}
