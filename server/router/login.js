const express = require('express');
const Router = express.Router();


const db = require('../db');
const util = require('../bin/util');


Router.post('/log',(req,res)=>{
	let result;
    var {userName,userPass}=req.body;
        try{
        	let data = await userModel.findOne({userName,userPass})
        	result = {data}
        	if(dat.length>0) {
        		result.token = create(name)
        	}
            console.log(result)
            res.send(util(200,'ok',result))
           
        }.catch((err)=>{
            console.log(err);

                res.send(util.sendData(403,'登陆失败',false));
        });
    
})