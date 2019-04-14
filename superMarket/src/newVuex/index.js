import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)
import user from './model/user'
import cart from './model/cart'
export default new Vuex.Store({
    modules:{
        user,
        cart
    }
})