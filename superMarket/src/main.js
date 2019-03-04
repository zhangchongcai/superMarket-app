// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router';
import store from './vuex/index'
import { Icon } from 'vant';

Vue.use(Icon)
Vue.use(VueRouter);
Vue.config.productionTip = false;
//字体图标
import 'font-awesome/css/font-awesome.min.css';
//引用样式重置
import './styles/common/base.css';
//引用mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
