<template>
  <div class="cart">
    <Toback :title="title"/>
    <div class="cart-warp">
      <div class="van-card" v-for="(item,ind) in list" :key="ind">
        <label class=" check-label" :for="forId(ind)">
          <input type="checkbox" :id="forId(ind)" class="checkbox" :checked="item.isBuy" @change="ischeckbox(item)">
          <i class="iconfont icon-check circle"></i>
        </label>
        <div class="self-img">
          <img src="http://image.chijiayd.com/group1/M00/09/94/rBJ8J1xmitGAK5qrAASKuu_CH_8924.jpg" alt="">
        </div>
        <div class="content">
          <div class="introduct">
            {{item.introduct}}
          </div>
          <div class="count">
              <span class="money">￥{{item.money}}</span>
              <ul class="showCar">
                    <li class="cart-cell">
                        <mt-button type="default" size="small" @click="cutCart(item)">-</mt-button>
                    </li>
                    <li class="cart-cell font">
                        {{item.num}}
                    </li>
                    <li class="cart-cell" >
                        <mt-button type="default" size="small" @click="addCart(item)">+</mt-button>
                    </li>
              </ul>
              <span class="iconfont icon-laji"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-footer">
      <div class="all-warp">
        <label class=" check-label" for="allCheckbox">
          <input type="checkbox" id="allCheckbox" class="checkbox" @change="allCheckbox($event)" v-model="allCheckBox">
          <i class="iconfont icon-check circle"></i>
        </label>
        <label for="allCheckbox">全选</label>
      </div>
      <div class="count-warp">
        <h3>
          <span>合计：</span>
          <span class="red">￥456.80</span>
        </h3>
        <p>总额¥{{totallMonay}}</p>
      </div>
      <div class="pay">去结算({{totall}})</div>
    </div>
  </div>
</template>

<script>
import Toback from '../../components/Toback';
export default {
  name: 'cart',
  components: {Toback},
  data() {
    return {
      title:'购物车',
      checked:true,
      allCheckBox:false,
      totall:0,
      totallMonay:0,
      list:[
        {
          introduct:'花田靴下 秋冬男士中筒袜/双针纯色刺绣纯棉男袜 8230 黑白灰款 特价5.5元',
          money:50,
          num:2,
          isBuy:false
        },
        {
          introduct:'花田靴下 秋冬男士中筒袜/双针纯色刺绣纯棉男袜 8230 黑白灰款 特价5.5元',
          money:50,
          num:2,
          isBuy:false
        },
        {
          introduct:'花田靴下 秋冬男士中筒袜/双针纯色刺绣纯棉男袜 8230 黑白灰款 特价5.5元',
          money:50,
          num:2,
          isBuy:false
        },
      ]
    }
  },
  methods: {
    addCart(item) {
      ++item.num;
      this.calc();
    },
    cutCart(item) {
      if(item.num==1){
        item.num =1 
      }else{
        --item.num
        this.calc();
      }
    },
    forId(index) {
      return 'cheboxId' + index;
    },
    allCheckbox(isCheck) {
      console.log(this.allCheckBox)
      this.list.forEach(item => {
        item.isBuy = !item.isBuy
      })
    },
    ischeckbox(item) {
      item.isBuy = !item.isBuy;
      this.calc();

    },
    calc() {
      this.totall=0;
      this.totallMonay=0;
      let isAllcheck=false;
      this.list.forEach(item => {
        isAllcheck=item.isBuy;
        console.log(this.list)
        if(item.isBuy){
          this.totall+=item.num;
          this.totallMonay += item.num*item.money
        }
      })
      this.allCheckBox=isAllcheck;
    },
  },
  computer: {

  },
  beforeCreate() {
    this.$store.commit('changeTabactive',false)
  }
}
</script>
<style lang="scss">
@import '../../styles/common/common.scss';
  .cart{
    background: #f5f5f5;
    height: 100vh;
    font-size: 12px;
    .red{color:#e4393c}
    .cart-warp{
      height: calc(100vh - rem(40) - rem(50));
      overflow: scroll;
      &>div{display: inline-block;}
      .showCar{
          display: inline-flex;
          height: rem(23);
          width:2rem;
          border: 1px solid #ccc;
          border-radius: .066667rem;
          margin-top: rem(5);
          margin-left: rem(5);
          overflow: hidden;
          li{float: left;list-style: none;height: 100%;}
          .mint-button--small{
              display: block;
              width: .453333rem;
              height: 100%;
              font-size: rem(20);
              text-align: center;
              padding: 0;
              .mint-button-text{width: 100%;}
          }
          .font{
              flex: 1;
              text-align: center;
              line-height: rem(23);
              border: #b8bbbf solid 1px;
              border-top: none;
              border-bottom: none;
              font-size: rem(14);
              padding:0 rem(4.5);
          }
      }
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
        height: rem(90);
        padding-left:rem(10);
        padding-top:rem(5);
        background: #fff;
        .self-img{
          display: inline-block;
          width: rem(90);
          height: rem(90);
          img{width: 100%;height: 100%;}
        }
        .content{
          display: flex;
          flex: 1;
          width: 200px;
          padding: .2rem;
          display: inline-block;
          .introduct{
            height: rem(50);
          }
          .count{
            flex: 1;
            line-height: rem(10);
            .money{
              box-sizing: border-box;
              display: inline-block;
              width: 45%;
              padding-left: .2rem;
              color: #df0f24;
              font-size: rem(14);
            }
            .icon-laji{
              margin-left: .2rem;
              color: #e4393c;
              border: 1px solid #e5e5e5;
              border-radius: 4px;
              font-size: rem(12);
              padding: rem(4);
            }
          }
        }
      }
    }
    .cart-footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
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
  }
</style>
