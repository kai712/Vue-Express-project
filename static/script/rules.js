//不可为空
export const empty = (message) => {
  return { required: true, message: message, trigger: 'blur' };
};
//验证邮箱
export const email = (rule, value, callback) => {
  if(value){
    const Reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!Reg.test(value)){
      callback(new Error('请输入正确的邮箱账号！'));
    }else {
      callback();
    }
  }else {
    callback()
  }
};
//验证手机
export const mobile = (rule, value, callback) => {
  if(value){
    const Reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
    if(!Reg.test(value)){
      callback(new Error('请输入正确的手机号码！'));
    }else {
      callback();
    }
  }else {
    callback()
  }
};
//验证营业执照号码
export const orgBusinessLicenseCode = (rule, value, callback) => {
  const Reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
  if(!Reg.test(value)){
    callback(new Error('请输入正确的营业执照号码！'));
  }else {
    callback()
  }
  callback()
};

