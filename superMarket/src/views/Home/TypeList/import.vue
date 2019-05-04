<template>
    <div class="import">
        <header class="header">
            <van-nav-bar
            title="进口食品"
            left-arrow
            @click-left="onClickLeft"
            />
        </header>
        <main class="main">
            <div class="IMG-warp">
                <img src="@/assets/image/other/import.jpg" alt="">
            </div>
            <van-tabs v-model="active" swipeable v-if="data">
                <van-tab :title="item.btnName" v-for="(item,ind) in data.specials.paramDto.specialNav.navTabList" :key="ind">
                    <div class="title">
                        <img :src="data.widgetsInstanceList[ind].titlePic" alt="">
                    </div>
                    <ul>
                        <li v-for="(item,index) in data.widgetsInstanceList[ind]['widgetsInstanceList'][0]['productsList']" 
                        :key="index"
                        @click="goDetail(item)"
                        >
                            <div class="item">
                                <div class="top-img"><img :src="item.url" alt=""> </div>
                                <p style="height:1.066667rem;overflow:hidden">{{item.name}}</p>
                                <p class="footer"> 
                                    <span style="color:#df0f24">￥{{item.price}}</span> 
                                    <span style="text-decoration:line-through;">￥{{item.mktprice}}</span>
                                    <span> <CarBtn></CarBtn></span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </main>
    </div>
</template>
<script>
import { Tab, Tabs , NavBar} from 'vant';
import Vue from 'vue'
import CarBtn from '../../../components/CarBtn';

Vue.use(Tab).use(Tabs).use(NavBar);

export default {
    components:{CarBtn},
    data() {
        return {
            active: 0,
            data:{
                specials:{paramDto:{specialNav:{navTabList:[]}}},
                widgetsInstanceList:{}
            },
        };
    },
    methods:{
        onClickLeft() {
          this.$router.go(-1)
        },
        scrollEvent() {
            let bodyDistance=document.documentElement.scrollTop// 获取当前位置
            //根据距离修改显示隐藏
            let tab = document.querySelector('.van-tabs__wrap')
            if(bodyDistance>=230 && tab){
                tab.style.position = 'fixed'
                tab.style.top = '46px'
            }else if(tab){
                tab.style.position = 'static'
            }
        },
        goDetail(item) {
            this.$router.push({
                "name":"detail",
                query:{imports:item.goodsId}
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', _=>{
            this.scrollEvent()
        })
    },
    destroyed(){
        // window.removeEventListener('scroll',)
    },
    created() {
        this.$api.importProductsList().then(res => {
            this.data = res.data[0]
            console.log(this.data)
        })
    }
}
</script>
<style lang="scss">
    .IMG-warp{
        img{
            width: 100%;
            height: 100%;
        }
    }
    .import{
        display: flex;
        flex-direction: column;
        background: rgb(191, 30, 46);
        .header{
            position: fixed;
            top: 0px;
            left: 0;
            right: 0;
            z-index: 8888;
        }
        .main{
            flex:1;
            margin-top: 46px;
            overflow: auto;
        }
        .van-nav-bar{
            background: #77b919;
        }
        .van-tab__pane{
            .title{
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            ul{
                padding-right: .1rem;
                padding-bottom: .2rem;
                li{
                    box-sizing: border-box;
                    width: 50%;
                    padding: .2rem 0 0 .1rem;
                    line-height: .533333rem;
                    display: inline-block;
                    .top-img{
                        position: relative;
                        width: 3.733333rem;
                        height: 3.733333rem;
                        text-align: center;
                        line-height: 3.733333rem;
                        overflow: hidden;
                        margin: 0 auto;
                        img{width: 100%;height: 100%;}
                    }
                    .item{
                        background: #fff;
                        border-radius: .133333rem;
                        padding: .133333rem;
                        padding-bottom: 0;
                        .footer{
                            display: flex;
                            justify-content: space-between;
                            line-height: .533333rem;
                            height: 1.066667rem;
                        }
                    }
                }
            }
        }
        .van-nav-bar{
            .van-icon{color: #fff}
            .van-nav-bar__title{
                color: #fff;
            }
        }
    }
</style>
