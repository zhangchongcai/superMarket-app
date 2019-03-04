const mongose = require("mongoose");
mongose.connect('mongodb://localhost:27017/cankao',{useNewUrlParser:true});
let db = mongose.connection;
db.on('error',()=>{
    console.log('connection error!');
});
db.on('open',()=>{
    console.log("we're connected!");
});
db.on('disconnected',()=>{
    console.log("数据连接断开！");
});