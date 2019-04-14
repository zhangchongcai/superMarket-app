// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import store from './newVuex/index';
import { Icon } from 'vant'
import * as TYPES from './newVuex/types'
import axios from 'axios'
import api from './http'
import '@/assets/fonts/iconfont.css';
//自定一ui框架
import MZ from '@/components/MZ'
Vue.use(MZ)//调用模块里的 install 方法并且将Vue实例进行传递

// import Axios from './http/http'

// Vue.prototype.$get = Axios.get;
// Vue.prototype.$post = Axios.post;

Vue.use(api)
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

Vue.prototype.axios = axios

const router = new VueRouter({
  routes
});
//全局路由守卫
//在进入某个路由前执行的代码
router.beforeEach((to,from,next)=> {
	if(to.meta.requireAuth)	{
		let token = sessionStorage.getItem('token')
		axios.get('http://127.0.0.1:5000/api/users/verifytoken',{headers:{token}}).then(res => {
			let {data} = res
			if(data.data) {
				next()
			}else {
				next({path:'/user/login'})
			}
		})
	}else {
		next()
	}
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
