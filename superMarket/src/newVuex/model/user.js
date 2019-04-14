import * as TYPES from '../types'

export default {
    state: {
        userInfo : {a:'dadada'},
        show:false
    },
    mutations: {
        [TYPES.USER_INFO] : (state, data) => {
            state.userInfo = data
        }
    },
    actions: {
        [TYPES.USER_INFO] : ({ commit },data) => {
            commit(TYPES.USER_INFO,data)
        }
    } 
}