const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../../bin/utils.js');
const newProductsModel = require('../../models/newProductsModel.js');

Router.post("/add",(req,res)=>{
    item = req.body;
    newProductsModel.insertMany({
        catId:item.catId,
        goodsId:item.goodsId,
        imageId:item.imageId,
        brandId:item.brandId,
        typeId:item.typeId,
        objType:item.objType,
        createTime:item.createTime,
        name:item.name,
        productName:item.productName,
        surl:item.surl,
        url:item.url,
        price:item.price,
        totalStore:item.totalStore,
        typeName:item.typeName,
        imageList:item.imageList,
        score:item.score,
        bn:item.bn,
        goodsPoint:item.goodsPoint,
        brand:item.brand,
        unit:item.unit,
        groupProducts:item.groupProducts,
        typeName:item.typeName,
        specTag:item.specTag,
        intro:item.intro
    }).then((resolved)=>{
        // console.log(resolved)c
        res.send(uitl.sendData(200,'添加成功',1)) ;
    }).catch((err)=>{
        console.log(err);
        res.send(uitl.sendData(200,"添加失败",1)) ;

    })    
});
//修改

Router.post('/updataOne',(req,res)=>{
    var item = req.body;
    console.log(item);
    //删除久图片
    // if()
    newProductsModel.updateOne({_id:item._id},{
        $set:{
            catId:item.catId,
            goodsId:item.goodsId,
            imageId:item.imageId,
            brandId:item.brandId,
            typeId:item.typeId,
            objType:item.objType,
            createTime:item.createTime,
            name:item.name,
            productName:item.productName,
            surl:item.surl,
            url:item.url,
            price:item.price,
            totalStore:item.totalStore,
            typeName:item.typeName,
            imageList:item.imageList,
            score:item.score,
            bn:item.bn,
            goodsPoint:item.goodsPoint,
            brand:item.brand,
            unit:item.unit,
            groupProducts:item.groupProducts,
            typeName:item.typeName,
            specTag:item.specTag,
            intro:item.intro
        }
    })
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(200,"更改成功！",resolved));
    })
    .catch((err)=>{
        console.log("更改失败！"+err);
    }) 
})
Router.post('/list',(req,res)=>{
    // var datas = JSON.parse(req.body.data);
    let data = req.body
    console.log(data);
    var page = data.page?data.page:1;
    var limit =data.limit?data.limit:20 ;
    var addition = data.addition;
    newProductsModel.find(addition)
    .then(data=> {
        if(data){return data}
    }).then(data=> {
        newProductsModel.find(addition).sort({'createTime':-1}).skip(parseInt(page-1)*limit).limit(limit)
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
    
    

Router.post('/mohu',(req,res)=>{
    var page =parseInt(req.body.page) ;
    var limit =parseInt(req.body.limit) ;
    var addition = req.body.addition;
    var reg = new RegExp(addition,'i')//不区分大小
    console.log(addition,'条件')
    console.log(page)
    console.log(limit)
    var filter={
        $or: [  // 多字段同时匹配
          // {price: {$regex: addition.price}},// 
          {productName: {$regex: addition.productName}}//  $options: '$i' 忽略大小写
        ]
    } 
    newProductsModel.find( filter ).sort({'createTime':-1}).then((data)=> {
        console.log(data,'第一次查询')
        if(data){
            return data
        }})
    .then((data)=>{
            newProductsModel.find( filter ).skip(parseInt(page-1)*limit).limit(limit).then((resolved)=> {
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
                res.send(uitl.sendData(403,"查询错误！",0));
            });
        })
        .catch((err)=>{
            console.log("第一次查询错误！"+err);
        })
    
    
});


Router.post('/findOne',(req,res)=>{
    var goodsId = req.body._id;
    console.log(req.body);
    newProductsModel.find({_id:goodsId})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(200,"单个查找成功",resolved));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})

//修改多条
Router.post('/updataMany',(req,res)=>{
    var data =JSON.parse(req.body.data);
    // console.log(data);
    newProductsModel.updateMany({_id:data.attr},{
        $set:data.addition,
    })
    .then((resolved)=>{
        return res.send(uitl.sendData(1,"更改成功！",resolved));
    })
    .catch((err)=>{
        console.log("更改失败！"+err);
    }) 
        
})

/**
 * @api {post} /coluList/updataMany
 * @apiName updataMany
 * @apiGroup coluList
 *
 * @apiParam {String}  id ID数组.
 

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "更新成功",
 *       "data":pages:x,totall:x,nowPage:x,limit:x,data:array;
 *     } 
 */
Router.post('/removeOne',(req,res)=>{
    var id =req.body._id;
        //删除单个
    newProductsModel.deleteOne({ _id: id })
        .then((resolved) => {
            if (resolved) {
                res.send(uitl.sendData(200, "单个删除成功！", 1));
            }
        }).catch((err) => {
            console.log(err + "单个删除错误");
            res.send(uitl.sendData(200, "单个删除失败！", 0));
        });

   
    
});
//删除多个

/**
 * @api {post} /coluList/updataMany
 * @apiName updataMany
 * @apiGroup coluList
 *
 * @apiParam {String}  id ID数组.
 

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "批量删除成功",
 *       "data":pages:x,totall:x,nowPage:x,limit:x,data:array; 
 *     }
 */
Router.post('/removeMany',(req,res)=>{
    var Idlist =req.body.list;
    console.log(Idlist)
    newProductsModel.deleteMany({_id:Idlist})
        .then((resolved)=>{
            // console.log(resolved)
            if(resolved){
                res.send(uitl.sendData(200,"批量删除成功！",1));
            }
        }).catch((err)=>{
            console.log(err+"批量删除错误");
            res.send(uitl.sendData(-1,"批量删除失败！",null));
        }) 
})

module.exports=Router  ;