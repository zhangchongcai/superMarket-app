import axios from '../api';

export const reg = data => {
    return axios({
        url: '/api/users/reg',
        method: 'post',
        data
    })
}
export const userNameExit = data => {
    return axios({
        url: '/api/users/testUser',
        method: 'post',
        data
    })
}
export const log = data => {
    return axios({
        url: '/api/users/log',
        method: 'post',
        data
    })
}
export const verifytoken = params => {
    return axios({
        url: '/api/users/verifytoken',
        method: 'get',
        params
    })
}
export const newProduct = data => {
    return axios({
        url: '/api/newProducts/list',
        method: 'post',
        data
    })
}
export const newInfo = data => {
    return axios({
        url: '/api/newProducts/findOne',
        method: 'post',
        data
    })
}
//购物车
export const cartAdd = data => {
    return axios({
        url: '/api/cart/add',
        method: 'post',
        data
    })
}
export const cartList = data => {
    return axios({
        url: '/api/cart/list',
        method: 'post',
        data
    })
}
export const cartDel = data => {
    return axios({
        url: '/api/cart/removeOne',
        method: 'post',
        data
    })
}
export const cartUpdata = data => {
    return axios({
        url: '/api/cart/updataOne',
        method: 'post',
        data
    })
}
//地址编辑
export const addressAdd = data => {
    return axios({
        url: '/api/address/add',
        method: 'post',
        data
    })
}
export const addressList = data => {
    return axios({
        url: '/api/address/list',
        method: 'post',
        data
    })
}
export const addressRemove = data => {
    return axios({
        url: '/api/address/removeOne',
        method: 'post',
        data
    })
}
export const addressUpdata = data => {
    return axios({
        url: '/api/address/updata',
        method: 'post',
        data
    })
}
export const addressFindone = data => {
    return axios({
        url: '/api/address/findOne',
        method: 'post',
        data
    })
}
export const typeList = data => {
    return axios({
        url: '/api/typeList/list',
        method: 'post',
        data
    })
}
//轮播图
export const swiperList = data => {
    return axios({
        url: '/api/swiper/list',
        method: 'post',
        data
    })
}
export const shenqianList = data => {
    return axios({
        url: '/api/shenqian/list',
        method: 'post',
        data
    })
}
export const shenqianFindOne = data => {
    return axios({
        url: '/api/shenqian/findOne',
        method: 'post',
        data
    })
}
//进口
export const importProductsList = data => {
    return axios({
        url: '/api/importProducts/list',
        method: 'post',
        data
    })
}
export const importDetail = data => {
    return axios({
        url: '/api/importDetail/findOne',
        method: 'post',
        data
    })
}
export default {
    reg,
    userNameExit,
    log,
    verifytoken,
    newProduct,
    newInfo,
    cartAdd,
    cartList,
    cartDel,
    cartUpdata,
    //地址
    addressRemove,
    addressList,
    addressAdd,
    addressFindone,
    addressUpdata,
    //分类
    typeList,
    //轮播图
    swiperList,

    shenqianList,
    shenqianFindOne,

    //进口
    importProductsList,
    importDetail
};    