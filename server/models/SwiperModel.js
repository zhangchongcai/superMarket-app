const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let swiperSchema =new Schema({
    Name:{type:String,required:true},
    url:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:Number,required:true},
    createTime:{type:String,required:true},
});

let SwiperModel = mongoose.model('swipers',swiperSchema);

module.exports = SwiperModel;