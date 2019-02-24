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
                            <mt-swipe-item v-for="n in 7" :key="n">
                                <img src="http://image.chijiayd.com/group1/M00/09/98/rBJ8J1xrxYWAN8UNAADeWxaaEdk060.jpg" alt="">
                            </mt-swipe-item>
                            </mt-swipe>
                            <div class="pagination">
                                <span>{{this.swiperIndex}}/7</span>
                            </div>
                    </div>
                    <div class="detail_info">
                        <h3>美国抱抱果儿 婴儿防痱爽身粉（防痱型）140g</h3>
                        <span class="red">￥15.9</span>
                        <div><span class="fa fa-star red" v-for="n in 5" :key="n"></span></div>
                        <div class="van-row"><span>品牌： 抱抱果儿</span> <span>货品编号：05040304</span></div>
                        <div>赠送积分： 15</div>
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
        <div class="shopCar">
            <a class="ico qq">
                <i class="iconfont icon-qq"></i>
            </a>
            <a class="ico cart">
                <i  class="iconfont icon-cart"></i>
                <span class="title">购物车</span>
            </a>
            <a class="showCar">
                <a class="cell">
                    <mt-button type="default" size="small">-</mt-button>
                </a>
                <a class="cell font">
                    12
                </a>
                <a class="cell">
                    <mt-button type="default" size="small">+</mt-button>
                </a>
            </a>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';    
import 'swiper/dist/css/swiper.min.css';
import { Swipe, SwipeItem } from 'mint-ui';
import Toback from './Toback';
export default {
    components: {Swipe, SwipeItem,Toback},
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
        }
    },
    methods:{
        handleChange(index) {
            this.swiperIndex = index+1;
        },
        handlScale() {
            this.active = !this.active
        },
    },
    created() {
        this.$store.commit('changeTabactive',false)
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
        console.log(this.vanGroupHeight)

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
        background: #f5f5f5;
        overflow: hidden;   
        line-height: 1rem;
        .iconfont {
            font-size: .693333rem;
        }
        .ico{
            display: inline-block;
            min-width: 15%;
            height: 100%;
            position: relative;
        }
        .qq{
            border-right: solid 1px #666;
            text-align: center;
        }
        .cart{
                position: relative;
                top: 0;
                .iconfont{
                    position: absolute;
                    top:rem(0);
                    left: rem(5);
                    font-size: .366667rem;
                }
                .title{
                    font-size: rem(12);
                }
            }
        .showCar{
            display:inline-table;
            // width:2.933333rem;
            float: right;
            border: 1px solid #ccc;
            border-radius: .066667rem;
            margin-top: rem(8);
            .cell{
                line-height: rem(3);
                display: table-cell;
                button{
                    width: .653333rem;
                    height: rem(32);
                    text-align: center;
                    border: none;
                    padding: 0;
                }
                .mint-button{border-radius: 0;}
            }
            .font{
                font-size: rem(16);
                border: #b8bbbf solid 1px;
                padding: 0 rem(10);
                border-top: none;
                border-bottom: none;
            }

        }
    }
}
</style>

