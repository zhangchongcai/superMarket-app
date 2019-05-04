const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let importSchema =new Schema({
    // Name:{type:String,required:true},
    // titlePic:{type:String,required:true},
    // widgetId:{type:String,require:true},
    // widgetsInstanceList:{type:Array,required:true}

    specials:{type:Object,required:true},
    widgetsInstanceList:{type:Object,required:true}

});

let SwiperModel = mongoose.model('imports',importSchema);

module.exports = SwiperModel;