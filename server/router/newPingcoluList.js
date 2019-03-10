const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../bin/utils.js');
const NewpingModel = require('../models/NewpingModel.js');

Router.post("/add",(req,res)=>{
    data = req.body;
    // console.log(data);
    // var nowtime = new Date().getTime()*1;
    data.forEach(item => {
        NewpingModel.insertMany({
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
            brand:item.brand
        }).then((resolved)=>{
            // console.log(resolved)c
            // res.send(uitl.sendData(1,'插入成功',data)) ;
        }).catch((err)=>{
            console.log(err);
            // res.send(uitl.sendData(-1,"插入失败",data)) ;

        })    
    })
            res.send(uitl.sendData(1,'插入成功',data)) ;
    
});

Router.post('/list',(req,res)=>{
    // var datas = JSON.parse(req.body.data);
    let data = req.body
    console.log(data);
    var page = data.page?data.page:1;
    var limit =data.limit?data.limit:20 ;
    var addition = data.addition;
    NewpingModel.find(addition)
    .then(data=> {
        if(data){return data}
    }).then(data=> {
        NewpingModel.find(addition).sort({'createTime':-1}).skip(parseInt(page-1)*limit).limit(limit)
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
    var datas =req.body.data;
    var page =parseInt(req.body.page) ;
    var limit =parseInt(req.body.limit) ;
    var addition = req.body.addition;
    var reg = new RegExp(addition,'i')//不区分大小
    NewpingModel.find(
        {
            $or:[ //多条件，数组
                {title:{$regex:reg}},
                {attribute:{$regex:reg}},
                {sortTitle:{$regex:reg}},
                {time:{$regex:reg}},
            ]
        }
        ).sort({'whatTime':-1})            //根据条件查询
    .then((data)=>{
        if(data){return data}
    }).then((data)=>{
        NewpingModel.find({
            $or:[ //多条件，数组
                {title:{$regex:reg}},
                {attribute:{$regex:reg}},
                {sortTitle:{$regex:reg}},
                {time:{$regex:reg}},
            ]
        }).skip(parseInt(page-1)*limit).limit(limit)
        .then((resolved)=>{
            // console.log(resolved);
            var array= {
                totall:data.length,
                pages:Math.ceil(data.length/limit),
                nowpage:page,
                limit:limit,
                data:resolved
            }
            res.send(uitl.sendData(1,"查询成功！",array));
            
        }).catch((err)=>{
            console.log(err);
            res.send(uitl.sendData(-1,"查询错误！",null));
        });
    })
    .catch((err)=>{
        console.log("第一次查询错误！"+err);
    })
    
    
});


Router.post('/findOne',(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    NewpingModel.find({_id:id})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(1,"单个查找成功",resolved));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})

Router.post('/updataOne',(req,res)=>{
    var data = req.body;
    // console.log(data);
    //删除久图片
    // if()
    NewpingModel.updateOne({_id:data.id},{
        $set:{
            "title":data.title,
            "img":data.img,
            "sortTitle":data.sort,
            "attribute":data.attribute,
            "miaoshu":data.miaoshu,
            "neirong":data.neirong,
            "gaunjianzi":data.guanjianzi,
            "paixu":data.paixu,
            "time":data.time,
            "auther":data.auther
        }
    })
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(1,"更改成功！",resolved));
    })
    .catch((err)=>{
        console.log("更改失败！"+err);
    }) 
})
//修改多条
Router.post('/updataMany',(req,res)=>{
    var data =JSON.parse(req.body.data);
    // console.log(data);
    NewpingModel.updateMany({_id:data.attr},{
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
    var id =req.body.id;
        //删除单个
    NewpingModel.deleteOne({ _id: id })
        .then((resolved) => {
            if (resolved) {
                res.send(uitl.sendData(1, "单个删除成功！", null));
            }
        }).catch((err) => {
            console.log(err + "单个删除错误");
            res.send(uitl.sendData(-1, "单个删除失败！", null));
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
    var id =req.body['id[]'];
    // console.log(req.body)
    // console.log(typeof(id));
    // console.log(id)
    NewpingModel.deleteMany({_id:id})
        .then((resolved)=>{
            // console.log(resolved)
            if(resolved){
                res.send(uitl.sendData(1,"批量删除成功！",null));
            }
        }).catch((err)=>{
            console.log(err+"批量删除错误");
            res.send(uitl.sendData(-1,"批量删除失败！",null));
        }) 
})

module.exports=Router  ;