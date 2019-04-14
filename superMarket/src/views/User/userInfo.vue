<template>
    <div class="user-inof-warp">
        <van-nav-bar title="用户" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" >
            <van-icon name="search" slot="right" />
        </van-nav-bar>
        <div class="main">
            <div class="info">
                <div class="content">
                    <div class="imag">
                        <img src="@/assets/image/user.jpg" alt="">
                    </div>
                    <div class="name">
                        <p>爱尔兰的画眉</p>
                        <p>会员名：乘双天</p>
                    </div>
                </div>
                <div class="arrow">
                    <van-icon name="arrow" class="arrow"></van-icon>
                </div>
            </div>
            <div class="group"> 
                <div class="van-row" v-for="(item,ind) in list" :key="ind"
                @click="goTo(item.path)"
                >
                    <div >{{item.name}}</div>
                    <div class="arrow">
                        <van-icon name="arrow" class="arrow"></van-icon>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <van-button type="warning" @click="quit">退出登录</van-button>
        </footer>
    </div>
</template>
<script>
import { NavBar, CollapseItem ,Row, Col ,Collapse,Icon,Button,Toast} from 'vant';
import {mapMutations} from 'vuex'
import {GET_CART_DATA} from '@/newVuex/types'
import Vue from 'vue'
Vue.use(NavBar).use(Row).use(Col).use(Icon).use(Button).use(Toast);
export default {
    components: {Row,Col,Button,Toast },
    data() {
        return {
            list:[

                {name:'我的收获地址',path:"address"},
                {name:'地区设置',path:"address"},
                {name:'隐私',path:"address"},
                {name:'通用',path:"address"},
                {name:'问题反馈',path:"address"},
                {name:'关于超市Web App',path:"address"}
            ]
        }
    },
    methods: {
        ...mapMutations([
            GET_CART_DATA
        ]),
        onClickLeft() {
            this.$router.push({name:'home'})
        },
        goTo(path) {
            this.$router.push({name:path})
        },
        quit() {
            sessionStorage.removeItem("token");
            Toast.success('已注销！')
            this.GET_CART_DATA = []
            this.$router.push({name:'home'})
        }
    }
}
</script>
<style lang="scss">
@import '../../styles/common/common.scss';
    .user-inof-warp{
        font-size: rem(12);
        background: #f5f5f5;
        .van-nav-bar{
            background: #f5f5f5;
        }
        .main{
            .info{
                padding-left: rem(20);
                height: 100%;
                display: flex;
                justify-content: space-around;
                border-bottom: 1px solid #f5f5f5;
                height: rem(100);
                background: #fff;
                .content{
                    display: flex;
                    flex: 1;
                    .imag{
                        height: rem(50);
                        margin:  auto auto;
                        vertical-align: middle;
                        img{
                            width: rem(50);
                            height: rem(50);
                            vertical-align: middle;
                            border-radius: 50%;
                        }
                    }
                    .name{
                        flex:1;
                        margin-left: rem(5);
                        p:first-child{
                            margin-top: rem(32);
                            vertical-align: middle;
                        }
                        P:last-child{
                            margin-top: rem(5)
                        }
                    }
                    
                }
                .arrow{
                    flex: 1;
                    padding-right: rem(10);
                    line-height: rem(100);
                    text-align: right;
                }
            }
            .van-row{
                display: flex;
                height: rem(40);
                line-height: rem(40);
                padding-left: rem(20);
                font-size: rem(14);
                justify-content: space-between;
                &>div{flex: 1}
                .arrow{text-align: right;padding-right: rem(10)}
                border-bottom: 1px solid #f5f5f5;
                background: #ffffff;
            }
            .van-row:first-child{
                margin-bottom: rem(10);
            }
            .van-row:nth-child(4){
                margin-bottom: rem(10);
            }
        }
        .footer{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .van-button{
                width: 100%;
            }
        }
    }

</style>


