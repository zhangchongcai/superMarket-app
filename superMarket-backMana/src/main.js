// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router';
import store from './vuex';
import axios from 'axios';
import api from './http';
import Elemnt from 'element-ui';
// import 'mint-ui/lib/style.css';

Vue.use(Elemnt)

import {
  MessageBox,
  Message
} from 'element-ui';

Vue.prototype.axios = axios

Vue.use(api)
Vue.use(VueRouter);
Vue.config.productionTip = false;
//字体图标
import 'font-awesome/css/font-awesome.min.css';
//引用样式重置
import './styles/common/base.css';

//引用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  // NProgress.start();
  // if (to.path == '/login') {
  //     let loginInfor = localStorage.getItem('userLocation');
  //     localStorage.clear();
  //     localStorage.setItem('userLocation', loginInfor);
  //     store.commit('updateLoginToken', null);
  //     store.commit('updateLoginUser', null);
  //     store.commit('updateUserMenu', null);
  //     localStorage.removeItem('navTabData');
  //     store.commit('updateNavTabDataByIndex', [{
  //         name: '首页',
  //         url: '/home',
  //         active: true,
  //     }])
  // 	next();
  // } else {		
  // 	if (!store.state.loginToken) {
  // 		if (token) {
  //             store.commit('updateLoginToken', token);
  //             store.commit('updateLoginUser', JSON.parse(localStorage.getItem('user')));
  //             store.commit('updateUserMenu', JSON.parse(localStorage.getItem('userMenu')));
  //             setGlobalTopNavs(to , next);
  // 		} else {
  // 			next({ path: '/login' });
  // 		}
  // 	} else {
  //         // next();
  //         setGlobalTopNavs(to, next);
  // 	}
  // }
  next();
});
// router.afterEach((transition) => {
//   NProgress.done();
// });

//整理全局弹出框
Vue.prototype.alert = function(obj) {
  let str = obj.str ? obj.str : '',
      title = obj.title ? obj.title : '提示',
      btnText = obj.btnText ? obj.btnText : '确定';
  MessageBox.alert(str, title, {
      confirmButtonText: btnText,
      callback: (action) => {
          if (obj.callBack) {
              obj.callBack(action);
          }
      }
  });
};
//整理全局访问框
Vue.prototype.confirm = function(obj) {
  let str = obj.str ? obj.str : '',
      title = obj.title ? obj.title : '提示',
      btnText = obj.btnText ? obj.btnText : '确定',
      cancelText = obj.cancelText ? obj.cancelText : '取消',
      type = obj.type ? obj.type : 'warning';
  MessageBox.confirm(str, title, {
          confirmButtonText: btnText,
          cancelButtonText: cancelText,
          type: type
      })
      .then(() => {
          if (obj.callBack) {
              obj.callBack();
          }
      })
      .catch(() => {
          if (obj.cancelCallBack) {
              obj.cancelCallBack();
          }
      });
};
//整理全局错误信息
Vue.prototype.error = function(str) {
  Message({
      message: str,
      type: 'warning'
  });
};

//整理全局成功信息
Vue.prototype.success = function(str) {
  Message({
      message: str,
      type: 'success'
  });
};

// 升降序
Vue.prototype.sort = function(str, type) {
  return function(a, b) {
      if (type == 'up') {
          return a[str] - b[str];
      } else if (type == 'down') {
          return b[str] - a[str];
      }
  }
}

//  全局组件之间通信
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
