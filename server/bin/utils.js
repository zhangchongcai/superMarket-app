function sendData(err,msg,data,code){
    return {
        code:code,
        msg:msg,
        data:data,
    }
}
module.exports = {sendData}