import Axios from './http'
//url传数组数组[1] 可改变 URL拼接  默认 ''，
export const register  =  (data) => Axios.post(['api/users/reg'],data).then( res => res.data )