import axios from './api';
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */
export const testGet = (params) => {
    //接口备注
    return axios({
        url: '/getApi',
        method: 'get',
        params
    });
};

export const testPost = data => {
    return axios({
        url: '/postApi',
        method: 'post',
        data
    })
}

export const login = data => {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

// 获取数据字典枚举值统一接口
export const getByName = params => {
    return axios({
        url: '/dictionary/getByName',
        method: 'get',
        params
    })
}

export const findAllHall = data => {
    return axios({
        url: '/cihall/findAllHall',
        method: 'post',
        data
    })
}

export const listCalendarPlan = data => {
    return axios({
        url: '/schplan/listCalendarPlan',
        method: 'post',
        data
    })
}

export const copySchPlan = data => {
    return axios({
        url: '/schplan/copySchPlan',
        method: 'post',
        data
    })
}

export const getApproveList = data => {
    return axios({
        url: '/schplan/approve/list',
        method: 'post',
        data
    })
}

export const getSaleList = data => {
    return axios({
        url: '/schplan/sale/list',
        method: 'post',
        data
    })
}

export const getPrizeList = data => {
    return axios({
        url: '/schplan/prize/list',
        method: 'post',
        data
    })
}

export const getChannelList = params => {
    return axios({
        url: '/channel/list',
        method: 'get',
        params
    })
}

export const approvePass = data => {
    return axios({
        url: '/schplan/approve/pass',
        method: 'post',
        data
    })
}

export const saleOpenStop = data => {
    return axios({
        url: '/schplan/sale/openStop',
        method: 'post',
        data
    })
}

export const getSchreportCalendar = data => {
    return axios({
        url: '/schreport/calendar',
        method: 'post',
        data
    })
}

export const schreportReport = data => {
    return axios({
        url: '/schreport/report',
        method: 'post',
        data
    })
}

// 查询影院树
export const getCinemaTree = params => {
    return axios({
        url: '/cinema/tree',
        method: 'get',
        params
    })
}

// 获取当前用户信息
export const getUserInfo = params => {
    return axios({
        url: '/common/user',
        method: 'get',
        params
    })
}
// 票类管理接口
export const tickettypeList = data => {
    return axios({
        url: '/tickettype/list',
        method: 'post',
        data
    })
}
export const tickettypeDel = data => {
    return axios({
        url: '/tickettype/del/' + data,
        method: 'post'
    })
}
export const tickettypeAdd = data => {
    console.log(data)
    let datas = JSON.stringify(data)
    console.log(datas)
    return axios({
        url: '/tickettype/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        dataType: "json",
        data: datas
    })
}
export const tickettypeView = (params) => {
    return axios({
        url: '/tickettype/view/' + params,
        method: 'get'
    })
}
export const tickettypeUpdate = data => {
        console.log(data)
        let datas = JSON.stringify(data)
        console.log(datas)
        return axios({
            url: '/tickettype/update',
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            dataType: "json",
            data: datas
        })
    }
// 票版管理接口
    //票版列表

    //元素列表
export const ticketelementList = params => {
    return axios({
        url: '/ticketsample/item/list',
        method: 'get',
        params
    })
}

export const ticketList =  params => {
    return axios({
        url:'/ticketsample/page',
        method :'post',
        params
    }) 
}
export const ticketsampleDel = params => {
    return axios({
        url: '/ticketsample/del/'+params,
        method: 'get',
    })
}
    //票版详情
export const ticketsampleQuery = params => {
    return axios({
        url:'/ticketsample/view/'+params,
        method: 'get',
    })
}
export const ticketelementAdd = data => {
    return axios({
        url: '/ticketsample/add',
        method: 'post',
        data
    })
}
export const ticketSampleupdata = data => {
    return axios({
        url:' /ticketsample/update',
        method:'post',
        data
    })
}
//------影厅管理接口-------
    //影厅类型
export const cinemagetByName = (params) => {
        return axios({
            url: '/dictionary/getByName' + params,
            method: 'get',
        })
    }
    //查询列表
export const cinemagetList = (params) => {
        return axios({
            url: '/cihall/find',
            method: 'post',
            params
        })
    }
    //查询影厅
export const getCiHallByUid = (params) => {
        return axios({
            url: '/cihall/getCiHallByUid',
            method: 'post',
            params
        })
    }
    //新增
export const addCiHall = data => {
        return axios({
            url: '/cihall/addCiHall',
            method: 'post',
            data: data
        })
    }
    //更新
export const updataCiHall = data => {
        return axios({
            url: '/cihall/updateCiHall',
            method: 'post',
            data
        })
    }
    //删除
export const deleteCiHall = data => {
        return axios({
            url: '/cihall/deleteCiHall',
            method: 'post',
            data
        })
    }
    //校验
export const nameExsit = (params) => {
    return axios({
        url: '/cihall/nameExsit',
        method: 'get',
        params
    })
}
export const seqExsit = (params) => {
        return axios({
            url: '/cihall/seqExsit',
            method: 'get',
            params
        })
    }
    //-----影院管理--------
export const cinemaList = (params) => {
        return axios({
            url: '/cinema/list',
            method: 'post',
            params
        })
    }
    //获得影院信息
export const cinemaGetInfo = (data) => {
        return axios({
            url: '/cinema/view/' + data,
            method: 'get',
        })
    }
    //修改影院
export const cinemaSave = data => {
        let datas = JSON.stringify(data)
        return axios({
            url: '/cinema/add',
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            dataType: "json",
            data: datas
        })
    }
    //城市查询
export const getPname = (parems) => {
    return axios({
        url: '/area/list/' + parems,
        method: 'get',
    })
}

//影片管理接口
export const DownloadmovieList = data => {
    return axios({
        url: '/schbashmovie/find',
        method: 'post',
        data
    })
}
export const DownloadmovieScan = params => {
    return axios({
        url: '/schbashmovie/getByMovieCode',
        method: 'get',
        params
    })
}
export const cinemaStockList = data => {
    return axios({
        url: '/schmovie/find?cinemaUid=e5330271-5357-4340-b7af-10d1872fb71d',
        method: 'post',
        data
    })
}
export const cinemaStockScan = params => {
    return axios({
        url: '/schmovie/getSchMovieDetail',
        method: 'get',
        params
    })
}
export const DownloadmovieEdit = params => {
    return axios({
        url: 'schbashmovie/save',
        method: 'post',
        params
    })
}
export const cinemaStockEdit = params => {
    return axios({
        url: 'schmovie/update',
        method: 'post',
        params
    })
}

/* 
    排片管理
    影厅列表 
*/
export const cinemaRoomList = data => {
    return axios({
        url: '/schplan/findAllHall',
        method: 'post',
        data
    })
}

// 获取拍片页价格方案 
export const getPricePlan = data => {
    return axios({
        url: '/schplan/getPriceProgram',
        method: 'post',
        data
    })
}

// 获取排片的语言
export const getSchPlanLang = data => {
        return axios({
            url: '/schplan/getSchPlanLanguage',
            method: 'post',
            data
        })
    }
// 排片获取价格体系
export const getPriceSystem = data => {
    return axios({
        url: '/schplan/getnetSale',
        method: 'post',
        data
    })
}
// 保存排片信息
export const saveMoviePlan = data => {
    return axios({
        url: '/schplan/savePlanAll',
        method: 'post',
        data
    })
}
// 提交审批
export const subApproves = data => {
    return axios({
        url: '/schplan/listDatePlan',
        method: 'post',
        data
    })
}


/* 
    排片管理
    电影列表
*/
export const cinemaMovieList = data => {
    return axios({
        url: '/schplan/findAllPlanMovie',
        method: 'post',
        data
    })
}

/*  
    排片管理
    新拖或位移保存排片
*/
export const savePlanAll = data => {
    return axios({
        url: 'schplan/savePlanAll',
        method: 'post',
        data
    })
}

/*
    排片管理
    获取时间轴内排片
*/
export const datePlanList = data => {
    return axios({
        url: '/schplan/listDatePlan',
        method: 'post',
        data
    })
}

/*
    排片管理
    删除影片
*/
export const deletePlan = data => {
    return axios({
        url: '/schplan/delSchPlan',
        method: 'post',
        data
    })
}

/*  
    排片管理
    保存修改时间轴
*/
export const editTimeLine = data => {
    return axios({
        url: '/schplan/editTimeLine',
        method: 'post',
        data
    })
}

/* 
    排片管理
    打开时间轴
*/
export const initTimeLine = data => {
    return axios({
        url: '/schplan/initTimeLine',
        method: 'post',
        data
    })
}

export default {
    //影片管理接口**start*/
    DownloadmovieList,
    DownloadmovieScan,
    cinemaStockList,
    cinemaStockScan,
    DownloadmovieEdit,
    cinemaStockEdit,
    //****end */
    testGet,
    testPost,
    login,
    getByName,
    findAllHall,
    listCalendarPlan,
    copySchPlan,
    getApproveList,
    getSaleList,
    getPrizeList,
    getChannelList,
    approvePass,
    saleOpenStop,
    getSchreportCalendar,
    schreportReport,
    getCinemaTree,
    getUserInfo,
    // 票类管理接口
    tickettypeList,
    tickettypeDel,
    tickettypeAdd,
    tickettypeView,
    tickettypeUpdate,
    // 票版管理接口
    ticketList,
    ticketsampleQuery,
    ticketsampleDel,
    ticketelementList,
    ticketelementAdd,
    //影厅管理
    cinemagetByName,
    cinemagetList,
    getCiHallByUid,
    updataCiHall,
    nameExsit,
    addCiHall,
    seqExsit,
    deleteCiHall,
    //影院管理
    cinemaList,
    cinemaGetInfo,
    getPname,
    // 排片
    cinemaSave,
    /* 场次排片 */
    cinemaRoomList,
    cinemaMovieList,
    savePlanAll,
    datePlanList,
    deletePlan,
    editTimeLine,
    initTimeLine,
    // 放映计划详情
    getPricePlan,
    getSchPlanLang,
    getPriceSystem,
    saveMoviePlan,
    subApproves
};