const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../../bin/utils.js');
const importDetialModel = require('../../models/importDetialModel.js');

Router.post("/add",(req,res)=>{
    data = req.body;
    // console.log(data);
    // var nowtime = new Date().getTime()*1;
    data.forEach(item => {
        importDetialModel.insertMany({
            Name:item.Name,
            titlePic:item.titlePic,
            widgetId:item.widgetId,
            widgetsInstanceList:item.widgetsInstanceList
        }).then((resolved)=>{
            // console.log(resolved)c
            res.send(uitl.sendData(1,'插入成功',resolved)) ;
        }).catch((err)=>{
            console.log(err);
            // res.send(uitl.sendData(-1,"插入失败",data)) ;

        })    
    })
    
});

module.exports=Router  ;