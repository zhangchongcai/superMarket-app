const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../../bin/utils.js');
const importModel = require('../../models/importModel.js');

Router.post("/add",(req,res)=>{
    item = req.body;
        importModel.insertMany({
            // Name:item.Name,
            // titlePic:item.titlePic,
            // widgetId:item.widgetId,
            // widgetsInstanceList:item.widgetsInstanceList
            specials:item.specials,
            widgetsInstanceList:item.widgetsInstanceList
        
        }).then((resolved)=>{
            // console.log(resolved)c
            res.send(uitl.sendData(1,'插入成功',resolved)) ;
        }).catch((err)=>{
            console.log(err);
            // res.send(uitl.sendData(-1,"插入失败",data)) ;

        })    
    // })
    
});

Router.post('/list',(req,res)=>{
    // var datas = JSON.parse(req.body.data);
        importModel.find().sort({'_id':-1})
        .then((resolved)=>{
            res.send(uitl.sendData(200,"查询成功！",resolved));
            
        }).catch((err)=>{
            console.log(err);
            res.send(uitl.sendData(-1,"查询错误！",null));
        });
    })
    
    


Router.post('/updataOne',(req,res)=>{
    var data = req.body;
    // console.log(data);
    //删除久图片
    // if()
    importModel.updateOne({_id:data.id},{
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
    importModel.updateMany({_id:data.attr},{
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
    importModel.deleteOne({ _id: id })
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
    importModel.deleteMany({_id:id})
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