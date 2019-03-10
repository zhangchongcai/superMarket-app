const goodList = [
    {
        path:'newproducts',
        meta: {
            title: '新品管理',
        },
        component:(resolve) => require(['views/goodsMana/newProducts'],resolve),
        // redirect:'newproducts/list',
        children:[
            {
                path:'list',
                meta:{
                    title:'新品添加修改'
                },
                component:(resolve) => require(['views/goodsMana/newProducts/list'],resolve),
            },
            {
                path:'addAndupdata',
                meta:{
                    title:'新品添加修改'
                },
                component:(resolve) => require(['views/goodsMana/newproducts/addAndupdata'],resolve),
            }
        ]
    },
    {
        path:'importproducts',
        meta: {
            title: '海外',
        },
        component:(resolve) => require(['views/goodsMana/import'],resolve),
        redirect:'importproducts/list',
        children:[
            {
                path:'list',
                meta:{
                    title:'进口列表'
                },
                component:(resolve) => require(['views/goodsMana/import/list'],resolve),
            },
            {
                path:'addAndupdata',
                meta:{
                    title:'海外添加修改'
                },
                component:(resolve) => require(['views/goodsMana/import/addAndupdata'],resolve),
            }
        ]
    }
]

export default goodList;