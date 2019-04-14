import vuexModules from './modules'
import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        domain: 'sss',
        loginToken: null, //登录用户token
        loginUser: null, //登录用户信息
        innerWidth: null, // 浏览器宽度
        innerHeight: null, // 浏览器高度
        tabActive:true
    },
    mutations: {
        updateLoginToken(state, newToken) { //更新token信息
            state.loginToken = newToken;
        },
        updateLoginUser(state, newUserInfor) { //更新登录用户信息
            state.loginUser = newUserInfor;
        },
        changeWindowSize(state, data) {
            // 修改浏览器窗口大小信息
            state.innerWidth = data.innerWidth;
            state.innerHeight = data.innerHeight;
        },
    },
    modules: vuexModules
})