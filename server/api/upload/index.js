const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');


//上传图片
exports.upload = (req, res, next) => {
  //生成multiparty对象，并配置上传目标路径
  const form = new multiparty.Form({uploadDir: './public/files/'});
  let inputFile,
      uploadedPath,
      dstPath;
  //上传完成后处理
  form.parse(req, (err, fields, files) => {
    if(err){
    } else {
      inputFile = files.file[0];
      uploadedPath = inputFile.path;
      dstPath = './public/files/' + inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, err => {
        if(err){
          throw err
        }
      });
    }
    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.end(inputFile.originalFilename)
  });
};
