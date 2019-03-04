const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let coluListSchema =new Schema({
    title:{type:String,required:true},
    img:{type:String,required:true},
    sortTitle:{type:String,required:true},
    attribute:{type:String,required:true},
    miaoshu:{type:String,required:true},
    neirong:{type:String,required:true},
    guanjianzi:{type:String,required:true},
    paixu:{type:String,required:true},
    time:{type:String,required:true},
    auther:{type:String,required:true},
    whatTime:{type:String,required:true},
});

let ColuListModel = mongoose.model('coluList',coluListSchema);

module.exports = ColuListModel;