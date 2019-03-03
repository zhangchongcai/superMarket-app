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
    component:(resolve) => require (['../views/Home/index'],resolve),
    name: '首页',
    redirect:'/home',
    children:[
        {
            path:'home',
            meta:{
                title:'主页'
            },
            component:(resolve) => require(['../views/Home/Main'],resolve),
            name:'主页'

        },
        
        {
            path:'typelist',
            meta:{
                title:'十个按钮',
            },
            component:(resolve) => require(['../views/Home/TypeList'],resolve),
            name:'layout',
            children:[
                {
                    path:'new',
                    meta:{title:'新品'},
                    component:(resolve) => require(['../views/Home/TypeList/new'],resolve),
                    name:'new',
                }
            ]
        }
    ]
    },
    {
      path: '/sort',
      meta: {
          title: '分类'
      },
      component:(resolve) => require (['../views/Sort/index'],resolve),
      name: '分类'
    },
    {
      path: '/cart',
      meta: {
          title: '购物车'
      },
      component:(resolve) => require (['../views/cart/index'],resolve),
      name: '购物车'
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
    {
        path:'/detail',
        mate:{
            title:'详情',
        },
        component:(resolve) => require (['../components/produDetail'],resolve) 
    },
     
];
export default routes;