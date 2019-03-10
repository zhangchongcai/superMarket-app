const express = require('express'); //请求第三方模块
const Router = express.Router(); //引用Router对象

const userModel = require("../models/usersModel.js");
const mail =require('../bin/mail.js');
const util = require('../bin/utils.js');

let obj={};
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
        userModel.findOne({userName:userName})
        .then((resolve)=>{
            if(resolve){
                res.send(util.sendData(1,'用户名已存在',null));
            }else{
                res.send(util.sendData(-1,'用户名可用',null));
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
            // console.log(resolve)
            if(resolve){
                res.send(util.sendData(1,'登陆成功',true));
            }else{
                res.send(util.sendData(-1,'登陆失败',false));
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
    var {userName,userPass,code}=req.body;
    //  console.log(code);
    //  console.log(obj);
    if(obj[userName]==code){
        userModel.insertMany({userName,userPass})
        .then((resolve)=>{
            res.send(util.sendData(1,'注册成功',null));
        }).catch((err)=>{
            res.send(util.sendData(-1,'注册失败',null));
            console.log(err)
        });
        
    }else{
        return res.send(util.sendData(-1,'验证码错误！',null));
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


