const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./models/dbconnect.js')
const cors = require('cors')

app.use(cors())
//解析post的请求参数
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//开启静态文件
app.use('/public',express.static(path.join(__dirname,'./public')))

//引用内置模块
const users  = require('./router/users.js')
const colulist = require("./router/coluList.js")
const newProducts = require('./router/goodslist/newProducts.js')
const importProducts = require('./router/goodslist/importProducts.js')
const importDetail = require('./router/goodslist/importDetail.js')
const cart = require('./router/cart.js')
const address = require('./router/address.js')
const typeList = require('./router/sortGoods.js')
const swiper = require('./router/swiper.js')
const shenqian = require('./router/goodslist/shenQianList.js')





//路由
app.use('/api/users',users) 
app.use('/api/coluList',colulist)
app.use('/api/newProducts',newProducts)
app.use('/api/importProducts',importProducts)
app.use('/api/importDetail',importDetail)
app.use('/api/shenqian',shenqian)
app.use('/api/cart',cart)
app.use('/api/address',address)
app.use('/api/typeList',typeList)
app.use('/api/swiper',swiper)


var port = 5000;
app.listen(port,()=>{
    console.log('server start in port:' + port)
})