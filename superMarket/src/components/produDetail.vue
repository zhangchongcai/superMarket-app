<template>
    <div class="productDetail">
        <div class="navga">
            <Toback :title="title"></Toback>
            <div class="nav">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">商品</mt-tab-item>
                    <mt-tab-item id="2">详情</mt-tab-item>
                    <mt-tab-item id="3">评价</mt-tab-item>
                </mt-navbar> 
            </div>
        </div>
               
        <div class="contenter">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="banner">
                        <mt-swipe @change="handleChange">
                            <mt-swipe-item v-for="(item,ind) in goodsInfo.imageList" :key="ind">
                                <img :src="item" alt="">
                            </mt-swipe-item>
                            </mt-swipe>
                            <div class="pagination">
                                <span v-if="goodsInfo.imageList">{{this.swiperIndex}}/{{goodsInfo.imageList.length}}</span>
                            </div>
                    </div>
                    <div class="detail_info">
                        <h3>{{goodsInfo.name}}</h3>
                        <div>
                            <span class="red">￥{{goodsInfo.price}}</span>
                            <span class="red" style=" color: rgb(102, 102, 102); text-decoration: line-through; margin-left: 0.133333rem;" v-if="goodsInfo.specPrice!='0'" >￥{{goodsInfo.specPrice}}</span>
                            <span style="float:right;color:red">{{goodsInfo.specTag}}</span>
                        </div>
                        <div><span class="fa fa-star red" v-for="n in goodsInfo.goodsPoint" :key="n"></span></div>
                        <div class="van-row"><span>品牌： {{goodsInfo.brand}}</span> <span>货品编号：{{goodsInfo.bn}}</span></div>
                        <div>赠送积分： {{goodsInfo.score}}</div>
                    </div>
                    <div class="van-cell-group" :style="active?'height:'+vanGroupHeight+'px':'height:1.5rem'" ref='cellGroup'>
                        <div class="title">
                            <span>促销</span>
                            <span class="fa fa-angle-right" :class="active?'angleActive':''" @click="handlScale"></span>
                        </div>
                        <div class="van-cell" v-for="n in 6" :key="n" >
                            购指定清洁用品满98元送微波四件套碗(赠品送完即止)9999
                        </div>
                    </div>
                    <div class="van-cell cell">
                        <div class="content">
                            <span class="gray">已选</span> 
                            <span>西村味栈 彩色宝石造型饼干300g（泰国进口） 1罐</span>  
                        </div>
                        <div>
                            <span class="fa">...</span>

                        </div>    
                            
                    </div>
                    <div class="van-cell cell">
                        <p class="hairline">由<span style="color:red;">𪠽𪠽超市</span>发货，满<span style="color:red;">59元</span>免运费。今晚前下单,最快可选择<span style="color:red;">明天(02月21日 周四)早上</span>送货</p>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="">
                        <img src="http://image.chijiayd.com/group1/M00/09/95/rBJ8J1xnr6CAZng4AAxEJaFeZHI822.jpg" alt="">
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div>暂无评价</div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <ul class="shopCar">
            <li class="ico qq">
                <i class="iconfont icon-qq"></i>
            </li>
            <li class="ico cart">
                <i  class="iconfont icon-cart"></i>
                <mt-badge size="small">{{cartNum}}</mt-badge>
                <span class="title">购物车</span>
            </li>
            <li>
                <ul class="showCar">
                    <li class="cart-cell">
                        <mt-button type="default" size="small" @click="cutCart">-</mt-button>
                    </li>
                    <li class="cart-cell font">
                        {{num}}
                    </li>
                    <li class="cart-cell" >
                        <mt-button type="default" size="small" @click="addCart">+</mt-button>
                    </li>
                </ul>
                <!-- <Stepper></Stepper> -->
            </li>
            <li class="add">
                <mt-button type="danger" size="large" @click="addMyCart">加入购物车</mt-button>

            </li>
        </ul>
    </div>
</template>
<script>
import Swiper from 'swiper';    
import 'swiper/dist/css/swiper.min.css';
import { Swipe, SwipeItem } from 'mint-ui';
import {Stepper , Toast} from 'vant'
import Vue from 'vue'
Vue.use(Stepper).use(Toast)
import Toback from './Toback'
import {mapMutations, mapGetters} from 'vuex'
import {GET_CART_DATA} from '../newVuex/types'
export default {
    components: {Swipe, SwipeItem,Toback , Stepper},
    data() {
        return {
            swiperIndex:1,
            selected:"1",
            title:'商品页',
            headerIndex:[
                {title:'商品'},
                {title:'详情'},
                {title:'评价'}
            ],
            active:true,
            vanGroupHeight:null,
            num:1,
            goodsInfo:{
                imageList:[]
            },
        }
    },
    computed: {
        ...mapGetters([
            'cartNum',
            'cartList'
        ])
    },
    methods: {
        ...mapMutations([
            GET_CART_DATA
        ]),
        handleChange(index) {
            this.swiperIndex = index+1;
        },
        handlScale() {
            this.active = !this.active
        },
        cutCart() {
            if(this.num>1){
                --this.num;
            }
        },
        addCart() {
            ++this.num;
        },
        //加入购物车
        addMyCart(){
            let user = sessionStorage.getItem('user')
            this.goodsInfo.user = user
            this.goodsInfo.isBuy = false
            console.log(this.goodsInfo)
            this.goodsInfo.num = this.num
            this.$api.cartAdd(this.goodsInfo).then(res => {
            if(res.code==200){
                Toast.success('添加成功！');
                this.$api.cartList(this.goodsInfo).then(res => {
                    if(res.code){
                        this.list = res.data.data
                        this.GET_CART_DATA(res.data.data)
                    }
                })
            }
        })
           
        },
        getGoodsInfo(id) {
            this.$api.newInfo({_id:id}).then(res => {
                if(res.code==200){
                    this.goodsInfo = res.data
                }
            })
        }
    },
    created() {
        var id = this.$route.query._id
        this.getGoodsInfo(id)
    },
    mounted() {
        var swiper = new Swiper('.swiper-container', {
          autoplay:true,
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            },
          });
        this.vanGroupHeight = this.$refs.cellGroup.offsetHeight

    },
    
    
}
</script>
<style lang="scss">
@import '../styles/common/common.scss';
.productDetail{
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-size: (12);
    color: #333;
    img{width: 100%;height: 100%}
    .navga{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        height: rem(90);
    }
    
    .contenter{
        background:#F5F5F5;
        color: #333;
        position: absolute;
        top: rem(90);
        bottom: rem(45);
        overflow: scroll;
        .banner{
            position: relative;
            width: 100vw;
            height: 100vw;
            img{
                width: 100%;
                height: 100%;
            }
            .pagination{
                font-size: 16px;
                position: absolute;
                width: 1.066667rem;
                height: 1.066667rem;
                background: rgba(0,0,0,.15);
                right: .2rem;
                bottom: .146667rem;
                border-radius: 50%;
                line-height: 1.066667rem;
                text-align: center;
                span{
                    font-size: .373333rem;
                    display: block;
                    color: #fff;
                    margin-right: .066667rem;
                }
            }
        }
        .detail_info{
            font-size: rem(12);
            background: #fff;
            h3{font-size: .426667rem}
            .red{color: #df0f24}
            padding:rem(10);
        }
        .van-row{
            display: flex;
            justify-content: space-between;
            padding-right: .5rem;
        }
        .van-cell-group{
            margin-top: rem(10);
            padding-left: rem(20);
            font-size: rem(12);
            background: #fff;
            transition: all 1s;
            overflow: hidden;
            .title{
                display: flex;
                font-size: .5rem;
                line-height: .5rem;
                padding: .5rem .5rem .5rem 0;
                border-bottom: 1px solid #f5f5f5;
                justify-content: space-between;
                span{transition: all 0.3s}
                .angleActive{transform:rotate(90deg)}
            }
            
        }
        .van-cell{
                color: #333;
                width: 100%;
                padding: 10px 15px 10px 0;
                box-sizing: border-box;
                line-height: 24px;
                background-color: #fff;
                border-bottom: 1px solid #f5f5f5;
                color: #333;
                font-size: rem(12);
                overflow: hidden;
        }
        .cell{
            margin-top: rem(10);
            padding-left: rem(20);
            display: table;
            .content{
                display: table-cell;
                .gray{
                    color: rgb(129, 131, 142);
                }
                .red{
                    color:red;
                }
            }
            .fa{
                display: table-cell;
                font-size: .7rem;
                line-height: .7rem;
            }
        }
            .hairline{
                font-size: rem(12);    
            }
    }
    .shopCar{
        position: fixed;
        height: rem(45);
        box-sizing: border-box;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        border: 1px solid #f5f5f5;
        li{float: left;list-style: none;}   

        .ico{
            display: inline-block;
            min-width: 15%;
            height: 100%;
            position: relative;
        }
        .qq{
            border-right: solid 1px #f5f5f5;
            text-align: center;
            line-height: 1rem;
            .iconfont{
                font-size: .693333rem;
            }

        }
        .cart{
                display: flex;
                position: relative;
                flex-direction: column;
                justify-content: space-around; 
                text-align: center;
                .iconfont{
                    font-size: .466667rem;
                }
                .mint-badge{
                    position: absolute;
                    right: rem(2);
                    top: rem(2);
                    height: .373333rem;
                    line-height: .373333rem;
                    padding: 0 .093333rem;
                    font-size: .1rem;
                    background: #ff3d24;
                    border-radius: .186667rem;
                    color: #fff
                }
                .title{
                    font-size: rem(12);
                }
            }
        .showCar{
            display: flex;
            height: rem(33);
            width:3rem;
            border: 1px solid #ccc;
            border-radius: .066667rem;
            margin-top: rem(5);
            margin-left: rem(5);
            overflow: hidden;
            // li{float: left;list-style: none;height: 100%;}
            .mint-button--small{
                display: block;
                width: .853333rem;
                height: 100%;
                font-size: rem(30);
                text-align: center;
                padding: 0;
                line-height: 100%;
                .mint-button-text{width: 100%;}
            }
            .font{
                flex: 1;
                text-align: center;
                line-height: rem(33);
                border: #b8bbbf solid 1px;
                border-top: none;
                border-bottom: none;
                font-size: rem(18);
                padding:0 rem(8.5);
            }
        }
        .add{
            float: right;
            width: rem(100);
            height: 100%;
            .mint-button{
                width: 100%;
                height: 100%;
                border-radius: 0;
            }
        }
    }
}
</style>

