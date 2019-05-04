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
            console.log(val)
            if(val.length==0){
                console.log('退出，清空')
                state.cartNum=0
                return 
            }
            val.forEach(item => {
                state.cartNum+=item.num
            })
        },
        [TYPES.GET_USER_ADDRESS] : (state,val) => {
            state.addressIndex = val
        },
        [TYPES.SET_CART_CARTNUM] : (state,val) => {
            state.cartNum = val
        }
    },


    getters : {
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