const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let coluListSchema =new Schema({
    catName:{type:String,required:true},
    catId:{type:String,required:true},
    children:{type:Array,required:true},
});

let CartModel = mongoose.model('sorts',coluListSchema);

module.exports = CartModel;