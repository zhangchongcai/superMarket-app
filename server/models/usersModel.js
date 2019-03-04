const mongoose = require('mongoose');//请求第三方模块
let Schema = mongoose.Schema; //引用Schema对象

let userSchema =new Schema({
    userName:{type:String,required:true},
    userPass:{type:String,required:true},
});

let usermodel = mongoose.model('users',userSchema);

module.exports = usermodel;