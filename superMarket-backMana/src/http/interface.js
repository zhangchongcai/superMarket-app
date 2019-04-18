import axios from './api';
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */
export const newProductsAdd = (data) => {
    //接口备注
    return axios({
        url: '/api/newProducts/add',
        method: 'post',
        data
    });
};
export const newProductsEdit = (data) => {
    //接口备注
    return axios({
        url: '/api/newProducts/updataOne',
        method: 'post',
        data
    });
};      
export const  newProductsRemoveOne= (data) => {
    //接口备注
    return axios({
        url: '/api/newProducts/removeOne',
        method: 'post',
        data
    });
}; 
export const  newProductsRemoveMany= (data) => {
    //接口备注
    return axios({
        url: '/api/newProducts/removeMany',
        method: 'post',
        data
    });
}; 

export const newProductsList = data => {
    return axios({
        url: '/api/newProducts/list',
        method: 'post',
        data
    })
}
export const newProductsfindOne = data => {
    return axios({
        url: '/api/newProducts/findOne',
        method: 'post',
        data
    })
}
export const newProductsfindMohu = data => {
    return axios({
        url: '/api/newProducts/mohu',
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
export const uploadImg = data => {
    return axios({
        url: '/api/coluList/uploadimg',
        method: 'post',
        data
    })
}
export const deleteimg = data => {
    return axios({
        url: '/api/coluList/deleteimg',
        method: 'post',
        data
    })
}
export const typeList = data => {
    return axios({
        url: '/api/typeList/add',
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
export const swiperAdd = data => {
    return axios({
        url: '/api/swiper/add',
        method: 'post',
        data
    })
}
export const swiperUpdata = data => {
    return axios({
        url: '/api/swiper/updata',
        method: 'post',
        data
    })
}
export const swiperRemoveOnde = data => {
    return axios({
        url: '/api/swiper/removeOne',
        method: 'post',
        data
    })
}
export const swiperFindOne = data => {
    return axios({
        url: '/api/swiper/findOne',
        method: 'post',
        data
    })
}
export const swiperMohu = data => {
    return axios({
        url: '/api/swiper/mohu',
        method: 'post',
        data
    })
}
export const swiperUploadImg = data => {
    return axios({
        url: '/api/swiper/uploadimg',
        method: 'post',
        data
    })
}
export default {
    //****end */
    login,
    uploadImg,
    deleteimg,


//商品管理
    //新品
    newProductsList,
    newProductsAdd,
    newProductsfindOne,
    newProductsEdit,
    newProductsRemoveOne,
    newProductsRemoveMany,
    newProductsfindMohu,

//分类
    typeList,
//轮播图
    swiperRemoveOnde,
    swiperUpdata,
    swiperAdd,
    swiperList,
    swiperUploadImg,
    swiperFindOne,
    swiperMohu

};