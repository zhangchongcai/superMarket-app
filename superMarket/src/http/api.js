import axios from 'axios'; //引入 axios
import config from './config.js'; //倒入默认配置
import qs from 'qs'; //序列化数据，视服务端的要求
import store from '../vuex/index';
import md5 from 'js-md5';
import {
    MessageBox,
    Message,
    Loading
} from 'element-ui';

/*** 全局loading处理 start ***/
// let needLoadingRequestCount = 0
//
// function showFullScreenLoading() {
//     if (needLoadingRequestCount === 0) {
//         startLoading()
//     }
//     needLoadingRequestCount++
// }
//
// function tryHideFullScreenLoading() {
//     if (needLoadingRequestCount <= 0) return
//     needLoadingRequestCount--
//     if (needLoadingRequestCount === 0) {
//         endLoading()
//     }
// }
//
// let loading
//
// function startLoading() {
//     loading = Loading.service({
//         lock: true,
//         text: '拼命加载中…',
//         spinner: 'el-icon-loading',
//         background: 'rgba(0, 0, 0, 0.8)'
//     })
// }
//
// function endLoading() {
//     loading.close()
// }
/*** 全局loading处理 end ***/

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: {},
            transformResponse: [function (data) {}]
        });
        instance.interceptors.request.use(
            (config) => {
                if (store.state.loginToken) {
                    config.headers['Authorization'] = store.state.loginToken;
                }
                if (config.url.indexOf('/sys/perm/user/updatePwd') > -1) {
                    delete config.headers['Authorization'] ; 
                }
                //根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (
                    config.method.toLocaleLowerCase() === 'post' ||
                    config.method.toLocaleLowerCase() === 'put' ||
                    config.method.toLocaleLowerCase() === 'delete'
                ) {
                    // config.data = qs.stringify(config.data);
                }
                // 请求开始显示loading方法 需要先判断是否为影片和影院的请求
                // if(config.url.indexOf('movie') != -1 || config.url.indexOf('cinema') != -1) {
                //     showFullScreenLoading()
                // }
                // if (
                //     config.method.toLocaleLowerCase() === 'get'
                // ) {
                //     config.data = qs.stringify(config.data);
                // }
                return config;
            },
            (error) => {
                //请求错误时（接口错误、超时等）
                //关闭loading
                console.log('request:', error);
                //判断请求超时
                if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
                    console.log('根据你设置的 timeout 判断请求超时了，你可以在这里加入超时的处理方案');
                    // return service.request(originalRequest); //例如再重复请求一次
                }

                //需要重定向到错误页面
                const errorInfo = error.response;
                console.log(errorInfo);

                if (errorInfo) {
                    //error = errorInfo.data //页面那边 catch 的时候就能拿到详细的错误信息，看最下边的 Promise.reject
                    const errorStatus = errorInfo.status; //404 500 403 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    });
                }
                return Promise.reject(error); //在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        instance.interceptors.response.use(
            (response) => {
                // 请求成功回来关闭loading方法 需要先判断是否为影片和影院的请求
                // if(response.config.url.indexOf('movie') != -1 || response.config.url.indexOf('cinema') != -1) {
                //     tryHideFullScreenLoading()
                // }
                let data;
                //IE9 时 response.data 是 undefined， 因此需要使用 response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = JSON.parse(response.request.responseText);
                } else {
                    data = response.data;
                }
                // let result = null ;
                //根据返回的code值来做不同的处理(和后端约定)
                switch (data.code) {
                    case 200:
                        return data;
                        break;
                    case 514:
                        return Promise.reject();
                        break;
                    case 444:
                        // alert(data.msg);
                        Message({
                            message: data.msg,
                            type: 'warning'
                        });
                        window.location.href = '#/login';
                        break;
                    default:
                        // alert(data.msg);
                        Message({
                            message: data.msg,
                            type: 'warning'
                        });
                        return Promise.reject();
                        break;
                }
                //若不是正确的返回code，且已登录，就显示错误
                // const err = new Error(data.description);
                // err.data = data ;
                // err.response = response ;

                // return data ;
            },
            (err) => {
                // 请求失败回来关闭loading方法 需要先判断是否为影片和影院的请求
                // if(err.config.url.indexOf('movie') != -1 || err.config.url.indexOf('cinema') != -1) {
                //     tryHideFullScreenLoading()
                // }
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误';
                            break;
                        case 401:
                            err.message = '未授权，请登录';
                            break;
                        case 403:
                            err.message = '拒绝访问';
                            break;
                        case 404:
                            err.message = `请求地址错误：${err.response.config.url}`;
                            break;
                        case 408:
                            err.message = '请求超时';
                            alert('请求超时，请秒后再试');
                            break;
                        case 500:
                            err.message = '服务器内部错误';
                            break;
                        case 501:
                            err.message = '服务未实现';
                            break;
                        case 502:
                            err.message = '网关错误';
                            break;
                        case 503:
                            err.message = '服务不可用';
                            break;
                        case 504:
                            err.message = '网关超时';
                            break;
                        case 505:
                            err.message = 'HTTP版本不受支持';
                            break;
                        default:
                    }
                }
                console.log(err);
                //此处使用 element UI 的组件提示
                // Message.error(`Error:${err}`);
                return Promise.reject(err); //返回接口返回的错误信息
            }
        );

        instance(options)
            .then((res) => {
                resolve(res);
                return false;
            })
            .catch((error) => {
                reject(error);
            });
    });
}