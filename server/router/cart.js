const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../bin/utils.js');
const cartModel = require('../models/cartModel.js');
 

Router.post("/add",(req,res)=>{
    let item = req.body;
    // console.log(item)
    console.log(item.user)
    console.log(item._id)
    cartModel.find({user:item.user,_id:item._id}).then((resolved)=> {
        // console.log(resolved,'结果')
        if(resolved.length) {
        	let number = item.num + Number(resolved[0].num)
        	let num = item.newNum?item.newNum:number
        	cartModel.updateOne({_id:item._id,user:item.user},{
		        $set:{
				    'num':num,
		        }
		    }).then((resolved)=>{
		        // console.log(resolved)
		        return res.send(uitl.sendData(200,"更改成功！",resolved))
		    }).catch((err)=>{
		        console.log("更改失败！"+err)
		    }) 
        }else {
		    cartModel.insertMany({
                _id:item._id,
		        user:item.user,
			    goodsId:item.goodsId,
			    productName:item.productName,
			    name:item.name,
			    price:item.price,
			    specPrice:item.specPrice,
			    specTag:item.specTag?item.specTag:'',
			    url:item.url,
			    num:item.num,
			    unit:item.unit,
			    isBuy:item.isBuy,
		    }).then((resolved)=>{
		        res.send(uitl.sendData(200,'添加成功',1)) 
		    }).catch((err)=>{
		        console.log(err);
		        res.scend(uitl.sendData(200,"添加失败",1)) 
		    })
        }
    })
})
    
    
Router.post('/list',(req,res)=>{
    let data = req.body
    // console.log(data);
    var page = data.page?data.page:1;
    var limit =data.limit?data.limit:100;
    cartModel.find({user:data.user}).then(data=> {
            var array= {
                totall:data.length,
                pages:Math.ceil(data.length/limit),
                nowpage:page,
                limit:limit,
                data:data
            }
            res.send(uitl.sendData(200,"查询成功！",array));
        })    
        .catch((err)=>{
                console.log(err);
                res.send(uitl.sendData(-1,"查询错误！",null));
            });
    })
    
    

Router.post('/mohu',(req,res)=>{
    var page =parseInt(req.body.page) ;
    var limit =parseInt(req.body.limit) ;
    var addition = req.body.addition;
    var reg = new RegExp(addition,'i')//不区分大小
    // console.log(addition,'条件')
    // console.log(page)
    // console.log(limit)
    var filter={
        $or: [  // 多字段同时匹配
          // {price: {$regex: addition.price}},// 
          {productName: {$regex: addition.productName}}//  $options: '$i' 忽略大小写
        ]
    } 
    cartModel.find( filter ).sort({'createTime':-1}).then((data)=> {
        console.log(data,'第一次查询')
        if(data){
            return data
        }})
    .then((data)=>{
            cartModel.find( filter ).skip(parseInt(page-1)*limit).limit(limit).then((resolved)=> {
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
    var _id = req.body._id;
    // console.log(req.body);
    cartModel.find({_id:_id})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(200,"单个查找成功",resolved[0]));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})

//修改多条
Router.post('/updataMany',(req,res)=>{
    var data =JSON.parse(req.body.data);
    // console.log(data);
    cartModel.updateMany({_id:data.attr},{
        $set:data.addition,
    })
    .then((resolved)=>{
        return res.send(uitl.sendData(1,"更改成功！",resolved));
    })
    .catch((err)=>{
        console.log("更改失败！"+err);
    }) 
        
});

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
    let user = req.body.user
        //删除单个
    cartModel.deleteOne({ _id: id ,user:user})
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
    cartModel.deleteMany({_id:Idlist})
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