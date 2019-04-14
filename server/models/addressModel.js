const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let coluListSchema =new Schema({
    user:{type:String,required:true},
    address: {type:String,required:true},
	areaCode: {type:String,required:true},
	city: {type:String,required:true},
	country: {type:String,required:false},
	county: {type:String,required:true},
	isDefault:{type:String,required:true},
	name:{type:String,required:true},
	postalCode: {type:String,required:true},
	province: {type:String,required:true},
	tel: {type:String,required:true},


});

let CartModel = mongoose.model('address',coluListSchema);

module.exports = CartModel;