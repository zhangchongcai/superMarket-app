function sendData(err,msg,data){
    return {
        err:err,
        msg:msg,
        data:data
    }
}
module.exports = {sendData}