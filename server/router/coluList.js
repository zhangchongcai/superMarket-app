const multer = require("multer");
const express = require("express");
const Router=express.Router();
const fs = require("fs");
const path = require("path");
const uitl = require('../bin/utils.js');
const ColuListModel = require('../models/colulistMode.js');

let upload = multer({dest:'tem/'})//设置图片的临时存放区
//上传图片
/**
 * @api {post} /coluList/upload 上传图片
 * @apiName upload
 * @apiGroup upload
 *
 * @apiParam {String}  formDate 图片信息.

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "上传成功",
 *       "data":{img.path},
 *     } 
 */
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
            fs.writeFile(path.join(__dirname,'../public/img/goodsImg',filename),data,(err)=>{
                if(err) {
                    console.log(err)
                    return res.send('上传错误2')}
                let data={
                    origin:req.file,
                    path:'img/goodsImg/'+filename,
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


//插入数据
/**
 * @api {post} /coluList/getcode 栏目内容插入
 * @apiName insetMany
 * @apiGroup coluList
 *
 * @apiParam {String}  title 标题.
 * @apiParam {String}  img 图片路径.
 * @apiParam {String}  sortTitle 分类标题.
 * @apiParam {String}  attri 属性.
 * @apiParam {String}  miaoshu 描述.
 * @apiParam {String}  neirong 内容.
 * @apiParam {String}  guanjianzi 关键字标题.
 * @apiParam {String}  paixu 排序.
 * @apiParam {String}  time 时间.
 * @apiParam {String}  auther 作者.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "插入成功",
 *       "data":null,
 *     }
 */
Router.post("/addList",(req,res)=>{
    data = req.body;
    // console.log(data);
    var nowtime = new Date().getTime()*1;
    ColuListModel.insertMany({
        title:data.title,
        img:data.img,
        sortTitle:data.sort,
        attribute:data.attribute,
        miaoshu:data.miaoshu,
        neirong:data.neirong,
        guanjianzi:data.guanjianzi,
        paixu:data.paixu,
        time:data.time,
        auther:data.auther,
        whatTime:nowtime,
    }).then((resolved)=>{
        // console.log(resolved)c
        res.send(uitl.sendData(1,'插入成功',data)) ;
    }).catch((err)=>{
        console.log(err);
        res.send(uitl.sendData(-1,"插入失败",data)) ;

    })
});

/**
 * @api {post} /coluList/findMany 栏目多个内容查询
 * @apiName findMany
 * @apiGroup coluList
 *
 * @apiParam {String}  sort 类别.
 * @apiParam {String}  page 页数.
 * @apiParam {String}  limit 数目.

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "查询成功",
 *       "data":{
 *               title 标题,
 *               img 图片路径,
 *               sortTitle 分类标题,
 *               attri 属性,
 *               miaoshu 描述,
 *               neirong 内容,
 *               guanjianzi 关键字标题,
 *               paixu 排序,
 *               time 时间,
 *               auther 作者,
 *              }
 *     } 
 */
Router.post('/loadList',(req,res)=>{
    var datas = JSON.parse(req.body.data);
    var page =parseInt(datas.page) ;
    var limit =parseInt(datas.limit) ;
    var addition = datas.addition;
    ColuListModel.find(addition)            //根据条件查询
    .then((data)=>{
        if(data){return data}
    }).then((data)=>{
        ColuListModel.find(addition).sort({'whatTime':-1}).skip(parseInt(page-1)*limit).limit(limit)
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
/**
 * @api {post} /coluList/getcode 模糊查找
 * @apiName findSomeThing
 * @apiGroup coluList
 *
 * @apiParam {String}  waht 模糊条件.
 * @apiParam {String}  page 页数.
 * @apiParam {String}  limit 数目.

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "查询成功",
 *       "data":{
 *               totall:总数，
 *               pasges：页数，
 *               每页数量：limit，
 *               Arryay:数组
 *              }
 *     } 
 */
Router.post('/mohu',(req,res)=>{
    let datas =req.body.data;
    let page =parseInt(req.body.page) ;
    let limit =parseInt(req.body.limit) ;
    let addition = req.body.addition;
    let reg = new RegExp(addition,'i')//不区分大小
    let filter = {
        $or:[ //多条件，数组
            {title:{$regex:reg}},
            {attribute:{$regex:reg}},
            {sortTitle:{$regex:reg}},
            {time:{$regex:reg}},
        ]
    }
    ColuListModel.find( filter ).sort({'whatTime':-1}).then((data)=>{    //根据条件查询
        if(data){return data}
    }).then((data)=>{
        ColuListModel.find( filter ).skip(parseInt(page-1)*limit).limit(limit).then((resolved)=> {
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

/**
 * @api {post} /coluList/getcode 栏目单个内容查询
 * @apiName findOne
 * @apiGroup coluList
 *
 * @apiParam {String}  id ID名.

 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "查询成功",
 *       "data":null,
 *     } 
 */

Router.post('/findOne',(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    ColuListModel.find({_id:id})
    .then((resolved)=>{
        // console.log(resolved)
        return res.send(uitl.sendData(1,"单个查找成功",resolved));
    })
    .catch((err)=>{
        console.log("查找单个失败"+err);
    })
})
/**
 * @api {post} /coluList/getcode 栏目内容修改
 * @apiName updataOne
 * @apiGroup coluList
 *
 * @apiParam {String}  id ID.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 * @apiSuccess {String} data 数据.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "修改成功",
 *       "data":null ,
 *     }
 */
Router.post('/updataOne',(req,res)=>{
    var data = req.body;
    // console.log(data);
    //删除久图片
    // if()
    ColuListModel.updateOne({_id:data.id},{
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
    ColuListModel.updateMany({_id:data.attr},{
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
    ColuListModel.deleteOne({ _id: id })
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
    ColuListModel.deleteMany({_id:id})
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