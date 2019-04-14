import * as TYPES from '../types'
// import { stat } from 'fs';
export default {
    state : {
       
        cartNum:0,
        cartList:[],
        addressIndex:''
 
    },

    mutations : {
        //获取购物车data
        [TYPES.GET_CART_DATA] : (state,val) => {
            state.cartList = val
            state.cartNum = 0
            val.forEach(item => {
                state.cartNum+=item.num
            })
        },
        [TYPES.GET_USER_ADDRESS] : (state,val) => {
            state.addressIndex = val
        }
    },


    getters : {
        //电影票
        cartNum(state) {
            return state.cartNum
        },
        cartList(state) {
            return state.cartList
        },
        addressIndex(state) {
            return state.addressIndex
        }

    }
    
}