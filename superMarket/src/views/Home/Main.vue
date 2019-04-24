<template>
  <div class="home">
    <header>
      <van-notice-bar
        text="我们的进口日用百货超市,包含各发达国家的优质食品、护肤化妆品、日用百货,专门针对白领女性和优质家庭主妇"
        left-icon="volume-o"
      />
    </header>
    <div class="main">
      <div class="swiper-container" id="swiper-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in swiperList" :key="item._id" @click="typelist_btn('new')">
            <img :src="'http://127.0.0.1:5000/public/'+item.url" alt="">
          </div>
          <div v-if="swiperList.length<0">
              <img src="@/assets/image/lunbotu1.jpg" alt="">
          </div>
        </div>
        <div class="swiper-pagination" id="swiper-banner-p"></div>
      </div>
      <ul class="type_list">
        <li v-for="(item,ind) in typeList" :key="ind" @click="typelist_btn(item.path)">
          <div><img :src="item.icon" alt=""></div>
          <div>{{item.name}}</div>
        </li>
      </ul>
      <ul class="banner-list">
        <li><div><img src="../../assets/image/other/7.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/top1.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/left.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/right.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/banner-list-img5.jpg" alt=""></div></li>
      </ul>
      <div class="common-list">
        <h3 class="common-title">每周特惠</h3>
        <div class="banner">
          <!-- Swiper -->
          <div class="swiper-container" id="swiper-list">
            <div class="swiper-wrapper" >
              <div class="swiper-slide" v-for="n in 9" :key="n"> 
                <div><img src="../../assets/image/common-list-img1.jpg" alt=""></div>
                <div class="overflow-text">韵柔洁 A计划丝柔抽取纸/纸巾155mm长包 520张×8包/提</div>
                <div><span>￥22.9</span><span class="gray">￥22.9</span></div>
              </div>
            </div>
          </div>
          <!-- Swiper end -->
        </div>
      </div>
      <div class="week-ad">
        <img src="../../assets/image/week-ad.jpg" alt="">
      </div>
      <div class="common-list">
        <h3 class="common-title">优惠活动</h3>
        <ul>
          <li><img src="@/assets/image/other/1.jpg" alt=""></li>
          <li><img src="@/assets/image/other/2.jpg" alt=""></li>
          <li><img src="@/assets/image/other/3.jpg" alt=""></li>
          <li><img src="@/assets/image/other/4.jpg" alt=""></li>
          <li><img src="@/assets/image/other/5.jpg" alt=""></li>
          <li><img src="@/assets/image/other/6.jpg" alt=""></li>
        </ul>
      </div>
      <div class="common-list">
        <h3 class="common-title">省钱有道</h3>
          <div class="shenqian_list" v-for="(item,ind) in shendaoList" :key="ind" @click="toDetail(item._id)">
            <div><img :src="item.productsList.url" alt=""></div>
            <div class="overflow-text">{{item.productsList.name}}</div>
            <div><span>￥22.9</span><span class="gray">￥{{item.productsList.price}}</span></div>
          </div>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Vue from 'vue';
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css'; 
import Tabbar from "@/components/NewTabbar";
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);
export default {
  name: 'Home',
  components:{Tabbar,NoticeBar },
  data(){
    return{
      typeList:[
        {
          name:'新品',
          path:'new',
          icon:require('@/assets/image/type/new.jpg')
        },
        {
          name:'进口食品',
          path:'import',
          icon:require('@/assets/image/type/import.jpg')
        },
        {
          name:'进口百货',
          path:'new',
          icon:require('@/assets/image/type/3.jpg')
        },
        {
          name:'生鲜肉菜',
          path:'new',
          icon:require('@/assets/image/type/4.jpg')
        },
        {
          name:'新鲜水果',
          path:'new',
          icon:require('@/assets/image/type/5.jpg')
        },
        {
          name:'低温酸奶',
          path:'new',
          icon:require('@/assets/image/type/6.jpg')
        },
        {
          name:'散装干活',
          path:'new',
          icon:require('@/assets/image/type/7.jpg')
        },
        {
          name:'烧烤专区',
          path:'new',
          icon:require('@/assets/image/type/8.jpg')
        },
        {
          name:'雪糕专区',
          path:'new',
          icon:require('@/assets/image/type/9.jpg')
        },
        {
          name:'我的关注',
          path:'new',
          icon:require('@/assets/image/type/10.jpg')
        },
      ],
      swiperList:[],
      shendaoList:[]
    }
  },
  methods:{
    typelist_btn(path) {
      console.log('Lu',path)
      this.$router.push({"name":path})
    },
    getSwiperData() {
      this.$api.swiperList().then(res => {
        let data = []
        res.data.forEach(item => {
          if(item.status){
            data.push(item)
          }
        })
        this.swiperList = data
        this.$nextTick(function () {
          var swiper = new Swiper('#swiper-banner', {
            autoplay:true,
            loop:true,
            pagination: {
              el: '#swiper-banner-p',
              dynamicBullets: true,
              autoplay:true,
              loop:true
              },
          });
        })

      })
    },
    getShendao() {
      this.$api.shenqianList().then(res => {
        this.shendaoList = res.data.data
        console.log(this.shendaoList)
      })
    },
    toDetail(id) {
      this.$router.push({name:'detail',query:{_id:id,"shendao":1}})
    }
  },
  mounted() {
    this.getSwiperData()
        //推荐
        var swiper2 = new Swiper('#swiper-list', {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          // pagination: {
          //   el: '#sweiper-list-p',
          //   clickable: l,
          // },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        
  },

  created() {
    this.getShendao()
  }
}
</script>
<style lang="scss" >
@import '../../styles/common/common.scss';

.home {
  height: 100%;
  .main{overflow: scroll;margin-bottom: rem(51);}
  .swiper-container{
    height: rem(150);
    img{
      height: rem(150);
      width: 100%
    }
  }
  .type_list{
    font-size: rem(12);
    overflow: hidden;
    li{
      margin-top: rem(10);
      float: left;
      width: 20%;
      text-align: center;
      height: rem(60);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img{width: rem(40);}
    }
  }
  .banner-list{
    margin-top: rem(10);
    overflow: hidden;
    li{
      float: left;
      box-sizing: border-box;
      img{height: 100%;width: 100%;}
    }
    & li:first-child{
      width: 3.8rem;
      height: 5.333333rem;
      border-right: .04rem solid #e5e5e5;
    }
    & li:nth-child(2){
      width: 6.2rem;
      height: 2.666667rem;
      border-bottom: .066667rem solid #e5e5e5
    }
    & li:nth-child(3){
      width: 3.093333rem;
      height: 2.666667rem;
      border-right: .026667rem solid #e5e5e5;
      img{width:100%;height: 2.666667rem;}
    }
    & li:nth-child(4){
      width: 3.093333rem;
      border-left: .026667rem solid #e5e5e5;
      height: 2.666667rem;
      img{width:100%;height: 2.666667rem;}
    }
    & li:last-child{
      width: 100%;
      border-top: .04rem solid #e5e5e5;
    }
  }
  .common-list{
    margin-top: rem(10);
    .common-title{
      line-height: .72rem;
      border-left: .106667rem solid #4bc502;
      font-size: .453333rem;
      padding-left: .333333rem;
      margin-bottom: .106667rem;
    }
    .swiper-container{
      height: rem(170);
    }
    .swiper-slide,.shenqian_list{
        font-size: rem(14);
        margin: 0!important;
        width: rem(122.5)!important;
      .overflow-text{
        white-space:nowrap; //不换行
        overflow:hidden;   //超出隐藏
        text-overflow:ellipsis;    //文本超出隐藏
      }
      img{
          width: rem(122.5);
          height: rem(122.5);
        }
        .gray{
          font-size: .293333rem;
          margin-left: .133333rem;
          text-decoration: line-through;
          color: #7d7d7d;
        }
      }
      .shenqian_list{
        box-sizing: border-box;
        width: 32%!important;
        padding: 10px;
        float: left;
      }
    ul {
      overflow: hidden;
      li{
        box-sizing: border-box;
        float: left;
        width: 3.333333rem;
        height: 4rem;
        border: .013333rem solid #e2e2e2;
        text-align: center;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
          }
      }
    }
  }
  .week-ad{
    img{
      width: 100%;
      height: 100%;
    }
  }
}


</style>
