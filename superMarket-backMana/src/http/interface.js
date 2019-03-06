import axios from './api';
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */
export const testGet = (params) => {
    //接口备注
    return axios({
        url: '/getApi',
        method: 'get',
        params
    });
};

export const testPost = data => {
    return axios({
        url: '/postApi',
        method: 'post',
        data
    })
}

export const login = data => {
    return axios({
        url: '/api/users/log',
        method: 'post',
        data
    })
}

export default {
    //****end */
    testGet,
    testPost,
    login,

};