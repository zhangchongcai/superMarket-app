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
                <li v-for="(item,ind) in menuList" :key="ind" :class="[ind==active?'active':'']" @click="handerItem(item,ind)">
                    <span :class="['iconfont icon-'+item.icon]"></span>
                    <span>{{item.catName}}</span>
                </li>
            </ul>
            </div>
            <div class="content">
                <Collapse :dataList="dataList" :activeNames="activeNames"></Collapse>
            </div>
        </div>
        <div class="footer">
           <Tabbar :active=tab ></Tabbar>
        </div>  
    </div>
</template>

<script>
import { Search} from 'vant';
import  Tabbar  from '@/components/NewTabbar'
import Collapse from './collapse'
import Vue from 'vue'
Vue.use(Search);
export default {
    components:{Tabbar,Search,Tabbar,Collapse},
    data () {
        return {
            value:'',
            tab:1,
            active:0,
            menuList:[
                {catName:'生鲜食品',icon:'jinkouniunai',catId:"888"},
                {catName:'食品饮料',icon:'jinkouniunai',catId:"8"},
                {catName:'厨房食品',icon:'canting',catId:"2"},
                {catName:'个护/美妆',icon:'meizhuang',catId:"5"},
                {catName:'生活家具',icon:'qingjie',catId:"386"},
                {catName:'母婴玩具',icon:'muying',catId:"50"},
                {catName:'家电数码',icon:'jiadian',catId:"59"},
                {catName:'文体用品',icon:'wenju',catId:"407"},
            ],
            activeNames:['0'],
            dataList:[]
        }
    },
    methods: {
        onSearch() {},
        handerItem(item,ind) {
            this.active=ind
            this.getData(item.catId)
        },
        getData(id) {
            let catId = id?id:888
            this.$api.typeList({catId:catId}).then(res => {
                console.log(res.data)
                this.activeNames=['0']
                this.dataList = res.data[0].children
            })
        }
    },
    created() {
        this.getData()
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
            overflow: scroll;
            overflow-x: hidden;
            overflow-y: scroll;
            ul{
                background: #f5f5f5;
                padding: 0 .3rem;
                li{
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    line-height: 1rem;
                    font-size: rem(14);
                    width: 100%;
                    height: 2rem;
                    .iconfont{font-size: .6rem}
                }
                .active{
                    border-bottom: #f44 3px solid;
                    span{color: #f44}
                }
            }
        }
        .content{
            flex: 1;
            overflow: auto;
        }
    }
    .footer{
        height: rem(51);
    }
}
</style>
