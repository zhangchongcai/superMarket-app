const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let NewcoluListSchema =new Schema({
	catId:{type:Number,require:true},
	goodsId:{type:Number,require:true},
	imageId:{type:String,require:false},
	brandId:{type:Number,require:false},
	typeId:{type:Number,require:false},
	objType:{type:String,require:false},
	createTime:{type:String,require:false},
	name:{type:String,require:true},
	productName:{type:String,require:true},
	surl:{type:String,require:true},
	url:{type:String,require:true},
	price:{type:String,require:true},
	totalStore:{type:Number,require:true},
	typeName:{type:String,require:false},
	imageList:{type:Array,require:true},
	score:{type:String,require:true},
	bn:{type:String,require:true},
	goodsPoint:{type:Number,require:true},
	brand:{type:String,require:true}

});

let NewpingListModel = mongoose.model('newPingList',NewcoluListSchema);

module.exports = NewpingListModel;