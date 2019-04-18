const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../bin/utils.js');
const sortModel = require('../models/sortModel.js');
 

Router.post("/add",(req,res)=>{
    let item = req.body;
    // data.forEach(item => {
        sortModel.insertMany({
            catName:item.catName,
            catId:item.catId,
            children:item.children,
        }).then((resolved)=>{
            res.send(uitl.sendData(200,'添加成功',1)) 
        }).catch((err)=>{
            console.log(err);
            res.scend(uitl.sendData(200,"添加失败",1)) 
        })
    })
    
// })
    
    
Router.post('/list',(req,res)=>{
    let data = req.body
    sortModel.find({catId:data.catId}).then(data => {
            res.send(uitl.sendData(200,"查询成功！",data));
    })    
    .catch((err)=>{
            console.log(err);
            res.send(uitl.sendData(-1,"查询错误！",null));
        });
})

//查找一个
Router.post('/findOne',(req,res)=>{
    var data = req.body;
    // console.log(req.body);
    sortModel.find({_id:data._id,user:data.user})
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
    sortModel.deleteOne({ _id: data.id ,user:data.user})
        .then((resolved) => {
            if (resolved) {
                res.send(uitl.sendData(200, "单个删除成功！", 1));
            }
        }).catch((err) => {
            console.log(err + "单个删除错误");
            res.send(uitl.sendData(200, "单个删除失败！", 0));
        });

   
    
});

module.exports=Router  ;