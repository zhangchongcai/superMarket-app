<template>
    <div class="sort">
        <div class="header">
            <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            >
            <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <div class="main">
            <div class="menu">
            <ul>
                <li v-for="(item,ind) in menuList" :key="ind">
                    <span :class="['iconfont icon-'+item.icon]"></span>
                    <span>{{item.name}}</span>
                </li>
            </ul>
            </div>
            <div class="content">
            <ul>
                <li></li>
            </ul>
            </div>
        </div>
        <div class="footer">
           <Tabbar :active=active ></Tabbar>
        </div>  
    </div>
</template>

<script>
import { Search} from 'vant';
import  Tabbar  from '@/components/NewTabbar'
import Vue from 'vue'
Vue.use(Search);
export default {
    components:{Tabbar,Search,Tabbar},
    data () {
        return {
            value:'',
            active:1,
            menuList:[
                {name:'生鲜食品',icon:'jinkouniunai',id:"1"},
                {name:'食品饮料',icon:'jinkouniunai',id:"1"},
                {name:'厨房食品',icon:'canting',id:"1"},
                {name:'个护/美妆',icon:'meizhuang',id:"1"},
                {name:'生活家具',icon:'qingjie',id:"1"},
                {name:'母婴玩具',icon:'muying',id:"1"},
                {name:'家电数码',icon:'jiadian',id:"1"},
                {name:'文体用品',icon:'wenju',id:"1"},
            ]
        }
    },
    methods: {
        onSearch() {}

    }
}
</script>
<style lang="scss">
@import '@/styles/common/common.scss';
.sort{
    display: flex;
    height: 100vh;
    flex-direction: column;
    .mint-search{height: auto;}
    .main{
        flex: 1;
        display: flex;
        overflow: hidden;
        .menu{
            width: 3rem;
            background: orange;
            overflow: scroll;
            overflow-x: hidden;
            overflow-y: scroll;
            ul{
                li{
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    line-height: 1rem;
                    font-size: rem(14);
                    width: 100%;
                    height: 2rem;
                    background: lightblue;
                    border-bottom: #fd3f27;
                }
            }
        }
    }
    .footer{
        height: rem(51);
    }
}
</style>
