function sendData(code,msg,data){
	// let option = {
	// 	code:code,
	// 	msg:msg,
	// 	data:data
	// }
	// let defaults = {
	// 	code:200,
	// 	msg:'ok',
	// 	data:[]
	// }
	// let res = {...defaults,...option}
    return {
        code:code,
        msg:msg,
        data:data,
    }
}
module.exports = {sendData}