import axios from 'axios'
import QS from 'qs';
const API = 'http://127.0.0.1:5000/'
const Axios = axios.create();

Axios.defaults.timeout = 100000;
Axios.interceptors.request.use( 
    //响应前配置
    confirm => {
        console.log(confirm)
        confirm.headers['Content-Type'] = 'application/json;charset=UTF-8';
        confirm.headers.token = localStorage.getItem('token') || '';
        switch(confirm.method){
            case "post" :
            confirm.data = QS.stringify(confirm.data);
            console.log('进入qs',confirm.data)

            break;
        }
        
        return confirm
    },
    error => {
        return Promise.reject(error);
    }
)


 Axios.interceptors.response.use( 
     //响应后配置
     response => {
        // console.log(response)
        return response
     },
     error => {
        return Promise.reject(error);
    }
);
const get = (urlarr,data={}) => { 
    let url = urlarr[1] ? urlarr[1] + urlarr[0] : API + urlarr[0]
    return Axios.get(url,{params:data})
} 
const post = (urlarr,data={}) => {
    let url = urlarr[1] ? urlarr[1] + urlarr[0] : API + urlarr[0]
    return Axios.post(url,data)
    }
export default {
    get,
    post
}
