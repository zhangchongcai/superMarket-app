import goodMana from './goodMana';
const mtRoutes = [
    {
        path:'/',
        meta: {
            title:'主页'
        },
        redirect:'/home'
    },
    {
        path:'home',
        name:'home',
        meta: {
            title:'主页'
        },
        component:(resolve) => require (['views/Home'],resolve),
    },
    {
        path:'goodsmana',
        meta: {
            title: '分类',
        },
        redirect:'goodsmana/newproducts',
        component:(resolve) => require(['views/goodsMana'],resolve),
        children:goodMana
    },
    {
        path:'swiper',
        meta: {
            title:'轮播图'
        },
        component:(resolve) => require(['views/swiper'],resolve),
        redirect:'/swiper/list',
        children:[
            {
                path:'list',
                meta: {
                    title:'轮播图'
                },
                component:(resolve) => require(['views/swiper/list'],resolve),
            },
            {
                path:'updataAndnew',
                meta: {
                    title:'轮播图'
                },
                component:(resolve) => require(['views/swiper/updataAndnew'],resolve),
            }
        ]
    },
    {
        path:'usermana',
        meta: {
            title:'用户管理'
        },
        component:(resolve) => require(['views/userMana'],resolve),
        redirect:'/userMana/list',
        children:[
            {
                path:'list',
                meta: {
                    title:'用户列表'
                },
                component:(resolve) => require(['views/userMana/list'],resolve),
            },
        ]
    }
]


export default mtRoutes