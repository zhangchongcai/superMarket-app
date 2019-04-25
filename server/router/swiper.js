const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../bin/utils.js');
const SwiperModel = require('../models/SwiperModel.js');
const {create , verify} = require('../bin/token')


let upload = multer({dest:'tem/'})//设置图片的临时存放区

 
//插入
Router.post("/add",(req,res)=>{
    let item = req.body;
        SwiperModel.insertMany({
            Name:item.Name,
            url:item.url,
            description:item.description,
            status:item.status,
            createTime:item.createTime
        }).then((resolved)=>{
            res.send(uitl.sendData(200,'添加成功',1)) 
        }).catch((err)=>{
            console.log(err);
            res.scend(uitl.sendData(200,"添加失败",1)) 
        })
    })
 //修改
 Router.post('/updata',(req,res) => {
    let item = req.body
    SwiperModel.updateOne({_id:item._id},{
        $set:{
            Name:item.Name,
            url:item.url,
            description:item.description,
            status:item.status,
            createTime:item.createTime
        }
    }).then((resolved)=>{
            res.send(uitl.sendData(200,'修改成功',resolved)) 
        }).catch((err)=>{
            console.log(err);
            res.scend(uitl.sendData(200,"修改失败",0)) 
        })
 })   
    
    
Router.post('/list',(req,res)=>{
    let token = req.header('token')
    // console.log(token,'验证')
    if(!verify(token)) {
        return res.send(uitl.sendData(400,'token不通过',0))
    }
    SwiperModel.find().sort({'createTime':-1}).then(data => {
            res.send(uitl.sendData(200,"查询成功！",data));
    })    
    .catch((err)=>{
            console.log(err);
            res.send(uitl.sendData(-1,"查询错误！",0));
        });
})
Router.post('/mohu',(req,res) => {
    let Name = req.body.addition
    console.log(Name,'条件')
    var filter={
        $or: [  // 多字段同时匹配
          // {price: {$regex: addition.price}},// 
          {Name: {$regex: Name}}//  $options: '$i' 忽略大小写
        ]
    } 
    SwiperModel.find( filter ).sort({'createTime':-1}).then((data)=> {
            res.send(uitl.sendData(200,"查询成功",data));
    }).catch((err)=>{
            console.log(err);
            res.send(uitl.sendData(403,"查询错误！",0));
        });
})
//查找一个
Router.post('/findOne',(req,res)=>{
    var data = req.body;
    console.log(req.body);
    SwiperModel.find({_id:data._id,user:data.user})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(200,"单个查找成功",resolved));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})

Router.post('/removeOne',(req,res)=>{
    var data =req.body;
        //删除单个
    SwiperModel.deleteOne({ _id: data._id})
        .then((resolved) => {
            if (resolved) {
                res.send(uitl.sendData(200, "单个删除成功！", 1));
            }
        }).catch((err) => {
            console.log(err + "单个删除错误");
            res.send(uitl.sendData(200, "单个删除失败！", 0));
        });
});

//上传图片
Router.post("/uploadimg",upload.single('test'),(req,res)=>{
    // console.log(req.file);
    let max_size = 300;
    let formatName = req.file.mimetype.split('/')[1]; //格式后缀名称
    console.log(formatName)
    if(req.file.size  >1024 * max_size){
        return  res.send(uitl.sendData(200,'上传失败','文件大于300K!')) ;
    }else if( formatName == 'png' || formatName == 'jpg' || formatName == 'jpeg'){
        fs.readFile(req.file.path,(err,data)=>{
        if(err){ return res.send("上传错误1")}
            let filename = new Date().getTime()+parseInt(Math.random(0,1)*1000)+req.file.originalname;
            fs.writeFile(path.join(__dirname,'../public/img/swiperImg',filename),data,(err)=>{
                if(err) {
                    console.log(err)
                    return res.send('上传错误2')}
                let data={
                    origin:req.file,
                    path:'img/swiperImg/'+filename,
                }
                return res.send(uitl.sendData(200,'上传成功',data)) ;
            });
                
        })
    }else{
         return  res.send(uitl.sendData(200,'图片格式错误!',0)) ;
    }
    
})

//删除图片
Router.post("/deleteimg",(req,res)=>{
    let paths = req.body.path
    fs.unlink(path.join(__dirname,'../public/',paths),function (err) {
        if (err) return console.log(err);
         return  res.send(uitl.sendData(200,'已删除图片!',1)) ;    
    })
    
})

module.exports=Router  ;