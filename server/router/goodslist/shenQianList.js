const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../../bin/utils.js');
const shenqianModel = require('../../models/shenqianModel.js');

Router.post("/add",(req,res)=>{
    let item = req.body.productsLis;
    // console.log(item);
    // var nowtime = new Date().getTime()*1;
    item.forEach(item => {
        shenqianModel.insertMany({
            products:item
        }).then((resolved)=>{
            // console.log(resolved)c
            // res.send(uitl.sendData(1,'插入成功',data)) ;
        }).catch((err)=>{
            console.log(err);
            // res.send(uitl.sendData(-1,"插入失败",data)) ;

        })    
    })
            res.send(uitl.sendData(1,'插入成功',1)) ;
    
});

Router.post('/list',(req,res)=>{
    // var datas = JSON.parse(req.body.data);
    let data = req.body
    console.log(data);
    var page = data.page?data.page:1;
    var limit =data.limit?data.limit:100 ;
    var addition = data.addition;
    shenqianModel.find(addition)
    .then(data=> {
        if(data){return data}
    }).then(data=> {
        shenqianModel.find(addition).sort({'createTime':-1}).skip(parseInt(page-1)*limit).limit(limit)
        .then((resolved)=>{
            // console.log(resolved);
            var array= {
                totall:data.length,
                pages:Math.ceil(data.length/limit),
                nowpage:page,
                limit:limit,
                data:resolved
            }
           
            res.send(uitl.sendData(200,"查询成功！",array));
            
        }).catch((err)=>{
                console.log(err);
                res.send(uitl.sendData(-1,"查询错误！",null));
            });
        })
    })
    Router.post('/findOne',(req,res)=>{
        var _id = req.body._id;
        shenqianModel.find({_id:_id})
        .then((resolved)=>{
            // console.log(resolved)
            return res.send(uitl.sendData(200,"单个查找成功",resolved[0]));
        })
        .catch((err)=>{
            console.log("查找单个失败"+err);
        })
    })

module.exports=Router  ;