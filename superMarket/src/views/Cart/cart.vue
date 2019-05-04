<template>
  <div class="cart">
    <Toback :title="title"/>
    <div class="cart-warp">
      <div class="van-card" v-for="(item,ind) in cartList" :key="ind">
        <label class=" check-label" :for="forId(ind)">
          <input type="checkbox" :id="forId(ind)" class="checkbox" :checked="item.isBuy" @click="ischeckbox(item)">
          <i class="iconfont icon-check circle"></i>
        </label>
        <div class="self-img">
          <img :src="item.url" alt="">
        </div>
        <div class="content">
          <div class="introduct">
            {{item.productName}}
          </div>
          <div class="count">
            <div class="co-left" v-if="item.specPrice!='0'">
              <span>￥{{item.specPrice}}</span> 
              <span class="spect-price">￥{{item.price}}</span>
            </div>
            <div class="co-left" v-if="item.specPrice=='0'">
              <span >￥{{item.price}}</span>
            </div>
              <div class="co-right">
                <van-stepper v-model="item.num"  @change="numChange(item)"/>
                <i class="iconfont icon-laji" @click="deleCart(item._id)"></i>
              </div>
          </div>
        </div>        
      </div>
      <div v-if="cartList.length<=0" class="fix">
        <router-link :to="{name:'home'}" tag="a">购物车空空如也~赶紧去抢购吧！</router-link>
      </div>
    </div>
    <div class="cart-footer">
      <div class="all-warp">
        <label class=" " for="allCheckbox">
          <van-checkbox v-model="checked" checked-color="#e4393c" @click="allCheckbox">反选</van-checkbox>
        </label>
      </div>
      <div class="count-warp">
        <h3>
          <span>合计：</span>
          <span class="red">￥{{totallMonay}}</span>
        </h3>
        <p>总额¥{{totallMonay}}</p>
      </div>
      <div class="pay">去结算({{cartNum}})</div>
    </div>

  </div>
</template>

<script>
import Toback from '../../components/Toback';
import { Swipe,SwipeItem,Button ,Checkbox,Stepper,Toast } from "vant"
import {mapMutations, mapGetters} from 'vuex'
import {GET_CART_DATA  } from '@/newVuex/types'
import Vue from 'vue'
Vue.use(Stepper).use(Toast);
export default {
  name: 'cart',
  components:{
         [Button.name]:Button,
         [Checkbox.name]:Checkbox,
         Checkbox,
         Toback,
  },
  data() {
    return {
      title:'购物车',
      checked:false,
      allCheckBox:false,
      totall:0,
      totallMonay:0,
    }
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartNum'
    ])
  },

  methods: {
    ...mapMutations([
      GET_CART_DATA,
    ]),
    forId(index) {
      return 'cheboxId' + index;
    },
    numChange(item) {
      item.newNum = item.num
      this.$api.cartAdd(item).then(res => {
            if(res.code==200){
                this.$api.cartList(item).then(res => {
                    if(res.code){
                      console.log("购物车数据：",res.data.data)
                      if(item.isBuy) {
                        this.GET_CART_DATA(res.data.data)
                        this.calc()
                      }
                    }
                })
            }
        })
    },
    allCheckbox(isCheck,self) {
      console.log(222)
      this.cartList.forEach(item => {
        item.isBuy = !item.isBuy
        console.log('1')
      })
      this.calc();
    },
    ischeckbox(item) {
      item.isBuy = !item.isBuy; 
      this.calc();
      let flg = this.cartList.every(item => {
          return item.isBuy
      })
      this.checked = flg?true:false
      console.log(flg)
      if(item.isBuy){
        this.GET_CART_DATA(this.cartList)
        this.calc()
      }
    },
    calc() {
      this.totall=0
      this.totallMonay=0
      let isAllcheck=false;
      this.cartList.forEach(item => {
        isAllcheck=item.isBuy;
        if(item.isBuy){
          this.totall+=item.num*1;
          this.totallMonay =Number( (item.num*item.price).toFixed(2) ) + Number(this.totallMonay)*1
          this.totallMonay = this.totallMonay.toFixed(2)
        }
      })
      this.allCheckBox=isAllcheck;
    },
    //删除
    deleCart(id) {
      let user = window.sessionStorage.getItem('user')
      console.log(user)
      this.$api.cartDel({'_id':id,'user':user}).then(res => {
        if(res.code==200){
          Toast.success('删除成功！')
          this.getData()
        }
      })
    },
    getData() {
      let user = sessionStorage.getItem('user')
      this.$api.cartList({'user':user}).then(res => {
      if(res.code==200){
        res.data.data.forEach(item =>{
          item.isBuy = false
        })
        this.GET_CART_DATA(res.data.data)
        this.calc()
      }
    })
  
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
@import '../../styles/common/common.scss';
  .cart{
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    height: 100vh;
    font-size: 12px;
    .fix{
      position:fixed;
      top:50%;
      left:50%;
      font-size: .3rem;
      transform: translateY(-50%);
      transform: translateX(-50%);
    }
    .red{color:#e4393c}
    .cart-warp{
      flex: 1;
      overflow: auto;
      &>div{display: inline-block;}
      .check-label{
        position: relative;
        display: inline-block;
        width: 20px;
        line-height: rem(90);
        color: #df0f24;
        .checkbox + i{
          position: absolute;
          top: 50%;
          left: -20%;
          display: inline-block;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: #df0f24 1px solid;
          border-radius:50%;
          visibility: visible; 
        }
        input[type=checkbox]:checked + i {
          visibility: hidden;
        }
        .checkbox + i::before{
          position: absolute;
          top: 50%;
          left: 0%;
          transform: translateY(-50%);
          font-size: 20px;
          display: inline-block;
          color: #df0f24;
          visibility: hidden;
        }
        input[type=checkbox]:checked + i::before{
          visibility:visible;
        }
      }
      input[type=checkbox]{visibility: hidden;}
      
      .van-card{
        display: flex;
        box-sizing: border-box;
        height: rem(90);
        padding-left:rem(10);
        padding-bottom: rem(5);
        margin-bottom:rem(10);
        background: #fff;
        .self-img{
          display: inline-block;
          width: rem(90);
          height: rem(90);
          img{width: 100%;height: 100%;}
        }
        .content{
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: .2rem;
          width: 200px;
          .introduct{
            flex: 1;
          }
          .count{
            display: flex;
            height: rem(30);
            line-height: rem(30);
            display: flex;
            color: #df0f24;
            font-size: .373333rem;
            .co-left{
              width: 40%;
            }
            .co-right{
              display: flex;
              flex:1;
            }
            .icon-laji{
              margin-left: .2rem;
              color: #e4393c;
              border: 1px solid #e5e5e5;
              border-radius: 4px;
              font-size: rem(16);
              padding: rem(4) rem(6);
              line-height: rem(20);
              text-align: center;
            }
          }
        }
      }
    }
    .cart-footer{
      height: rem(50);
      line-height: rem(50);
      background: #ffffff;
      &>div{float: left;}
      .all-warp{
        position: relative;
        box-sizing: border-box;
        width: 25%;
        height: 100%;
        text-align: right;
        padding-right: rem(10);
        .check-label{
          position: absolute;
          display: inline-block;
          left: rem(30);
          bottom: 50%;
          transform: translateY(60%);
          width: 20px;
          height: 20px;
          line-height: rem(90);
          color: #df0f24;
          .checkbox + i{
            position: absolute;
            top: 50%;
            left: -20%;
            display: inline-block;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border: #df0f24 1px solid;
            border-radius:50%;
            visibility: visible; 
          }
          input[type=checkbox]:checked + i {
            visibility: hidden;
          }
          .checkbox + i::before{
            position: absolute;
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
            font-size: 20px;
            display: inline-block;
            color: #df0f24;
            visibility: hidden;
          }
          input[type=checkbox]:checked + i::before{
            visibility:visible;
          }
        }
        input[type=checkbox]{visibility: hidden;}
      
      }
      .count-warp{
        width: 50%;
        height: 100%;
        h3{
          padding-top: .133333rem;
          font-weight: 700;
          line-height: .666667rem;
          font-size: .426667rem;
        }
        p{
          line-height: .4rem;
          font-size: .266667rem;
          color: #999;
        }
      }
      .pay{
        width: 25%;
        height: 100%;
        font-size: .426667rem;
        color: #fff;
        background: #e4393c;
        font-weight: 700;
        text-align: center;
      }
    }
    .spect-price{
      color: #7d7d7d;
      font-size: .32rem; 
      text-decoration: line-through; 
      margin-left: 0.133333rem;
    }
  }
</style>
