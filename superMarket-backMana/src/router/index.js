import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import mtRoutes from './Mt'
let routes = [
    
    {
    path: '/',
    meta: {
        title: 'home'
    },
    component:(resolve) => require (['views/index'],resolve),
    children:mtRoutes
    },

    {
      path: '/user',
      name: 'user',
      meta: {
          title: '用户'
      },
      component:(resolve) => require (['views/User/index'],resolve),
      name: '用户',
      redirect:'/user/login',
      children:[
            {
                path:'login',
                meta:{title:'登录'},
                component:(resolve) => require(['views/User/login'],resolve),
            },
            {
                path:'reg',
                meta:{title:'注册'},
                component:(resolve) => require(['views/User/register'],resolve),
            }
      ],
    },
     
];
export default routes;