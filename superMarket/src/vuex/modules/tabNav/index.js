const state = {
    tabActive:true,
}

const mutations = {
    changTabActive(state,data){
        state.tabActive = !state.tabActive
    },
}


export default {
    namespaced: true,
    state,
    mutations,
}