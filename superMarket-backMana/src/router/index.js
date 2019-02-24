// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)
// import home from '../views/main/index.vue';
// export default new Router({
//   routes: [
//   ]
// })

let routes = [
    
    {
    path: '/',
    meta: {
        title: '首页'
    },
    component:(resolve) => require (['../views/index'],resolve),
    name: '首页',
    children:[
        {
            path:'home',
            meta: {
                title:'主页'
            },
            component:(resolve) => require (['../views/Home'],resolve),
            name:'主页'
        },
        {
            path:'sort',
            meta: {
                title: '分类',
            },
            component:(resolve) => require(['../views/Sort'],resolve)
        }
    ]
    },

    {
      path: '/user',
      meta: {
          title: '用户'
      },
      component:(resolve) => require (['../views/User/index'],resolve),
      name: '用户',
      redirect:'/user/login',
      children:[
            {
                path:'login',
                meta:{title:'登录'},
                component:(resolve) => require(['../views/User/login'],resolve),
            },
            {
                path:'reg',
                meta:{title:'注册'},
                component:(resolve) => require(['../views/User/register'],resolve),
            }
      ],
    },
     
];
export default routes;