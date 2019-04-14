let config = {
    methods: 'post',
    baseURL: '', //http://localhost:9006/api',//'http://m.tthappy.cn/api', //基础URL前缀
    headers: {
        //请求头信息
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}, //参数
    timeout: 10000, //设置超时时间
    withCredentials: false, //携带凭证
    responseType: 'JSON'
};

let domain = document.domain;
console.log(domain)
switch (domain) {
    // case '127.0.0.1': 
    //     config.baseURL = 'http://192.168.100.122:8082'
    //     break;
    case '192.168.100.222': 
        config.baseURL = 'http://192.168.100.222:8082';
        break;
    default:
        config.baseURL = 'http://127.0.0.1:5000';
}
export default config;