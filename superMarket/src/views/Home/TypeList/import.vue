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
            <van-tabs v-model="active" swipeable>
                <van-tab title="标签 1" v-for="(item,ind) in 5" :key="ind">
                    <div class="title">
                        <img src="@/assets/image/other/xiuxian.jpg" alt="">
                    </div>
                    <ul>
                        <li v-for="(item,ind) in 8" :key="ind">
                            <div class="item">
                                <div class="top-img"><img src="@/assets/image/other/import1.jpg" alt=""> </div>
                                <p>Sabava 越南沙巴哇芋头条100g（越南进口）</p>
                                <p class="footer"> <span style="color:#df0f24">￥14.8</span> <span> <CarBtn></CarBtn></span></p>
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
        active: 0
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
            if(bodyDistance>=230){
                tab.style.position = 'fixed'
                tab.style.top = '46px'
            }else {
                tab.style.position = 'static'
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', _=>{
            this.scrollEvent()
        })
    },
    destroyed(){
        window.removeEventListener('scroll')
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
                li{
                    box-sizing: border-box;
                    width: 50%;
                    padding: .2rem 0 0 .1rem;
                    
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
    }
</style>
