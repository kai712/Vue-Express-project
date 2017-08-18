const mongoose = require('mongoose');
//链接数据库
const promise = mongoose.connect('mongodb://localhost:27017/SRM', {
    useMongoClient: true,
    /* other options */
});
module.exports = promise;
