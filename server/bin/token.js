const jwt = require('jsonwebtoken');
const config = require('../config.json');

//密钥： 用于加密的key
let {secret} = config;

exports.create = (username,expiresIn=60*60*24)=> {
	//username: 用于加密的用户名
	//expires： token有效期（单位：s),默认2小时

	//生成Token： 根据传入用户名和key进行坚弥，比设置有效期
	let token = jwt.sign({username}, secret, {
		expiresIn
	})
	// console.log('create',username,secret,expiresIn)
	// console.log("token:",token)

	return token;
}
exports.verify = (token)=> {
	let res = false;
	try { 
		res = jwt.verify(token,secret);//得出解密后的结果obeject：{username：xxx}
		// console.log("verify",token,secret)
		// console.log("verify",res)
		
	}catch(err){
		res = false;
	}
	return res;
}	