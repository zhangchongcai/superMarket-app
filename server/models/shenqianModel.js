const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let shenqianSchema =new Schema({
    products:{type:Object,required:true},
});

let ColuListModel = mongoose.model('shenLists',shenqianSchema);

module.exports = ColuListModel;