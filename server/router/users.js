const express = require('express'); //请求第三方模块
const Router = express.Router(); //引用Router对象

const userModel = require("../models/usersModel.js");
const mail =require('../bin/mail.js');
const util = require('../bin/utils.js');
const {create , verify} = require('../bin/token')
let obj={};



Router.post('/mohu',(req,res)=>{
    let {userName} = req.body
    console.log(userName)
    let filter={
        $or: [  // 多字段同时匹配
          // {price: {$regex: addition.price}},// 
          {userName: {$regex: userName}}//  $options: '$i' 忽略大小写
        ]
    } 
    userModel.find( filter ).sort({'createTime':-1}).then((data)=> {
        res.send(util.sendData(200,'查询成功',data))
    })


})











/**
 * @api {post} /user/testUser 用户名验证是否唯一
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/testUser',(req,res)=>{
    var {userName}=req.body;
        // console.log(userName,'检验')
        userModel.findOne({userName:userName})
        .then((resolve)=>{
            // console.log(resolve)
            if(resolve){
                res.send(util.sendData(200,'用户名已存在',1));
            }else{
                res.send(util.sendData(200,'用户名可用',0));
            }
            
        }).catch((err)=>{
            console.log(err);
        });
    
})



/**
 * @api {post} /user/login 登陆验证
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/log',(req,res)=>{
    var {userName,userPass}=req.body;
        userModel.findOne({userName:userName,userPass:userPass})
        .then((resolve)=>{
            if(resolve){
                let result={};
                result.token = create(userName)
                res.send(util.sendData(200,'登陆成功',result));
            }else{
                res.send(util.sendData(200,'登陆失败',0));
            }
        }).catch((err)=>{
            console.log(err);
        });
    
})



/**
 * @api {post} /user/login 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String}  username 用户名.
 * @apiParam {String} userpass 用户密码.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 */
Router.post('/reg',(req,res)=>{
    var {userName,userPass,createTime}=req.body;
     // console.log(userName);
        userModel.insertMany({userName,userPass,createTime}).then((resolve)=> {
            res.send(util.sendData(200,'注册成功',1));
        }).catch((err)=>{
            res.send(util.sendData(-1,'注册失败',0));
            console.log(err)
        });
    
})

Router.post('/list',(req,res)=>{
     // console.log(userName);
        userModel.find().then((data)=> {
            res.send(util.sendData(200,'查询成功',data));
        }).catch((err)=>{
            res.send(util.sendData(-1,'查询失败',0));
            console.log(err)
        });
    
})

//处理token验证
Router.get('/verifytoken',(req,res,next) => {
    //获取请求头中的token
    let token = req.header('token')
    // console.log(token,'验证')
    if(verify(token)) {
        return res.send(util.sendData(200,'token通过',1))
    }else {
        return res.send(util.sendData(400,'token不通过',0))

    }

})


/**
 * @api {post} /user/getcode 邮箱验证
 * @apiName getcode
 * @apiGroup getcode
 *
 * @apiParam {String}  username 用户名.
 *
 * @apiSuccess {String} err 错误码.
 * @apiSuccess {String} msg 错误信息.
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": "1",
 *       "msg": "ok",
 *       "path":邮箱返回的验证码xxxx; 
 */


//获取邮箱验证码
Router.post('/getcode',(req,res)=>{
    var userName = req.body.userName;
    if(!userName && userName==""){return res.send(util.sendData(-1,"邮箱出错！",null));}
    var num = parseInt(Math.random(1,0)*100000);
    mail.sendmail(userName,num)
    .then((resovle)=>{
        obj[userName]=num;
        res.send(util.sendData(1,'验证码已发送',null));
    }) 
    .catch((err)=>{
        console.log(err);
        res.send(util.sendData(-1,'邮箱出错！',null))
    })
});


module.exports = Router;


