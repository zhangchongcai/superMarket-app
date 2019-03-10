const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/dbconnect.js');
const cors = require('cors');

app.use(cors());7777
//解析post的请求参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//开启静态文件
app.use(express.static(path.join(__dirname,'./public')));

const users  = require('./router/users.js');//引用内置模块
const colulist = require("./router/coluList.js");
const newPinglist = require('./router/newPingcoluList.js')

app.use('/api/users',users); //路由
app.use('/api/coluList',colulist);
app.use('/api/newPing',newPinglist)

var port = 5000;
app.listen(port,()=>{
    console.log('server start in port:'+port);
})