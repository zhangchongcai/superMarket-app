const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let importDetialModel =new Schema({
	groupProducts:{type:Array,require:false},
    product:{type:Object,require:false},
    salesRuleOrderList:{type:Array,require:false},

});

let NewpingListModel = mongoose.model('importDetials',importDetialModel);

module.exports = NewpingListModel;