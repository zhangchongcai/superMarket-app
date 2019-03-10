import goodMana from './goodMana';
const mtRoutes = [
    {
        path:'home',
        meta: {
            title:'主页'
        },
        component:(resolve) => require (['views/Home'],resolve),
        name:'主页'
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
        path:'order',
        meta: {
            title:'订单详情'
        },
        component:(resolve) => require(['views/order'],resolve)
    }
]


export default mtRoutes