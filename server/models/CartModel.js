const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let coluListSchema =new Schema({
    user:{type:String,required:true},
    goodsId:{type:String,required:true},
    productName:{type:String,required:true},
    price:{type:String,required:true},
    specPrice:{type:String,required:false},
    specTag:{type:String,required:false},
    url:{type:String,required:true},
    num:{type:Number,required:true},
    unit:{type:String,required:true},
    isBuy:{type:String,required:true}


});

let CartModel = mongoose.model('carts',coluListSchema);

module.exports = CartModel;