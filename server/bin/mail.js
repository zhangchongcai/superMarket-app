'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "320282089@qq.com", // 默认邮箱
            pass: 'bowzhiqgiiofbhfd' // //smtp 授权码
        }
    });

   

    // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(info)

    // });
    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
             // 发送邮件相关信息
            let mailOptions = {
                from: '320282089@qq.com', // sender address
                to: mail, // list of receivers
                subject: 'XXX邮箱验证✔', // Subject line
                // text: 'Hello world---我是text?', // plain text body
                html: `<b style="color:red">您的验证码为：${msg}</b>` // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {reject('发送失败！')}
                resolve('发送成功！')
            })
        })
    }
   module.exports={sendmail};
// });