const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../../bin/utils.js');
const importDetialModel = require('../../models/importDetialModel.js');

Router.post("/add",(req,res)=>{
    item = req.body;
    // console.log(data);
    // var nowtime = new Date().getTime()*1;
    importDetialModel.insertMany({
        goodsId:item.goodsId,
        groupProducts:item.groupProducts,
        imageList:item.imageList,
        product:item.product,
        shipInfo:item.shipInfo
    }).then((resolved)=>{
        // console.log(resolved)c
        res.send(uitl.sendData(1,'插入成功',resolved)) ;
    }).catch((err)=>{
        console.log(err);
        // res.send(uitl.sendData(-1,"插入失败",data)) ;

    })    
    
});
Router.post('/findOne',(req,res)=>{
    var goodsId = req.body.goodsId;
    // console.log(goodsId);
    importDetialModel.find({goodsId:goodsId})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(200,"单个查找成功",resolved));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})

module.exports=Router  ;