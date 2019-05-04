const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let importDetialModel =new Schema({
	goodsId:{type:String,required:true},
	groupProducts:{type:Object,required:true},
	imageList:{type:Array,required:true},
	product:{type:Object,required:true},
	shipInfo:{type:String,required:true}

});

let NewpingListModel = mongoose.model('importDetials',importDetialModel);

module.exports = NewpingListModel;