import axios from './api';
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */
export const newPingAdd = (data) => {
    //接口备注
    return axios({
        url: '/api/newPing/add',
        method: 'post',
        data
    });
};

export const newPingList = data => {
    return axios({
        url: '/api/newPing/list',
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
    login,

//商品管理
    //新品
    newPingList,
    newPingAdd,

};