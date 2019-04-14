<template>
    <div>
        <van-tabbar v-model="status" @change="goTo"	>
            <van-tabbar-item icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" dot>分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" :info="cartNum">购车</van-tabbar-item>
            <van-tabbar-item icon="manager-o">用户</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import {Tabbar, TabbarItem } from 'vant';
import {mapGetters} from 'vuex'

import Vue from 'vue'
Vue.use(Tabbar).use(TabbarItem);
export default {
    props :{
        active:{
            type:Number
        }
    },
    data() {
        return {
            status:1,
        }
    },
    computed: {
        ...mapGetters([
            'cartNum'
        ])
    },
    methods: {
        goTo(val) {
            console.log(val)
            this.status = val
            switch(this.status){
                case 0: this.$router.push({name:'home'}) ; break;
                case 1: this.$router.push({name:'sort'}) ; break;
                case 2: this.$router.push({name:'cart'}) ; break;
                case 3: this.$router.push({name:'user'}) ; break;
            } 
        }
    },
    mounted() {
        this.status = this.active
    }
}
</script>
<style>

</style>


