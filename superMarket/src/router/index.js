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
    redirect:'/home',
    children:[
        {
            path:'home',
            name:'home',
            meta:{
                title:'主页'
            },
            component:(resolve) => require(['../views/Home/Main'],resolve),

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
                    name:'new',
                    meta:{title:'新品'},
                    component:(resolve) => require(['../views/Home/TypeList/new'],resolve),
                }
            ]
        }
    ]
    },
    {
      path: '/sort',
      name: 'sort',
      meta: {
          title: '分类'
      },
      component:(resolve) => require (['../views/Sort/index'],resolve),
      redirect:'/sort/layout',
      children:[
          {
            path: 'layout',
            name: 'sortlayout',
            meta: {
                title: '分类'
            },
            component:(resolve) => require (['../views/Sort/layout'],resolve),
          }
      ]
    },
    {
      path: '/cart',
      name:"cart",
      meta: {
          title: '购物车',
          requireAuth:true
      },
      component:(resolve) => require (['../views/cart/index'],resolve),
    },
    {
      path: '/user',
      name: 'user',
      meta: {
          title: '用户',
      },
      component:(resolve) => require (['../views/User/index'],resolve),
      redirect:'/user/info',
      children:[
            {
                path:'login',
                name:'login',
                meta:{title:'登录'},
                component:(resolve) => require(['../views/User/login'],resolve),
            },
            {
                path:'reg',
                meta:{title:'注册'},
                component:(resolve) => require(['../views/User/register'],resolve),
            },
            {
                path:'info',
                name:'info',
                meta:{
                    requireAuth:true
                },
                component:(resolve) => require(['../views/User/userInfo'],resolve)
            },
            {
                path:'address',
                name:"address",
                meta:{
                    requireAuth:true
                },
                component:(resolve) => require(['../views/User/address'],resolve)
            },
            {
                path:'addressEdit',
                name:'addressEdit',
                meta:{
                    requireAuth:true
                },
                component:(resolve) => require(['../views/User/addressEdit'],resolve)
            }
        ],
    },
    {
        path:'/detail',
        name:'detail',
        mate:{
            title:'详情',
        },
        component:(resolve) => require (['../components/produDetail'],resolve) 
    },
     
];
export default routes;