<template>
  <div class="home">
    <div class="main">
      <div class="swiper-container" id="swiper-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../../../static/images/lunbotu1.jpg" alt="">
          </div>
          <div class="swiper-slide">
            <img src="../../../static/images/lunbotu1.jpg" alt="">
          </div>
          <div class="swiper-slide">
            <img src="../../../static/images/lunbotu1.jpg" alt="">
          </div>
        </div>
        <div class="swiper-pagination" id="swiper-banner-p"></div>
      </div>
      <ul class="type_list">
        <li v-for="item in 8" :key="item" @click="typelist_btn(item)">
          <div><img src="../../assets/image/fenlei1.jpg" alt=""></div>
          <div>新品</div>
        </li>
      </ul>
      <ul class="banner-list">
        <li><div><img src="../../assets/image/banner-list-img1.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/banner-list-img2.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/banner-list-img2.jpg" alt=""></div></li>
        <li><div><img src="../../assets/image/banner-list-img2.jpg" alt=""></div></li>
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
            <!-- Add Pagination -->
            <!-- <div class="swiper-pagination" id="sweiper-list-p2"></div> -->
            <!-- Add Arrows -->
            <!-- <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div> -->
          </div>
        </div>
      </div>
      <div class="week-ad">
        <img src="../../assets/image/week-ad.jpg" alt="">
      </div>
      <div class="common-list">
        <h3 class="common-title">优惠活动</h3>
        <ul>
          <li v-for="n in 6" :key="n">
            <img src="http://image.chijiayd.com/group1/M00/09/59/rBJ8J1w1V26AcYD3AAGXAHQT-RA750.jpg" alt="">
          </li>
        </ul>
      </div>
      <div class="common-list">
        <h3 class="common-title">省钱有道</h3>
          <div class="shenqian_list" v-for="n in 20" :key="n">
            <div><img src="../../assets/image/common-list-img1.jpg" alt=""></div>
            <div class="overflow-text">韵柔洁 A计划丝柔抽取纸/纸巾155mm长包 520张×8包/提</div>
            <div><span>￥22.9</span><span class="gray">￥22.9</span></div>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Tabbar  from '../../components/Tabbar'
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'Home',
  components:{Tabbar },
  data(){
    return{}
  },
  methods:{
    typelist_btn(item) {
        if(item==1) {
          this.$router.push('typelist/new')
        }
    }
  },
  mounted() {
    //如果想要从后台请求图片放上去 new Swiper要写在网络请求成功的函数里面，否则不会出来数据。
        // var mySwiper = new Swiper( '.swiper-container', {
        //   autoplay:true,
        //   loop:true
        // })
        var swiper = new Swiper('#swiper-banner', {
          autoplay:true,
          loop:true,
          pagination: {
            el: '#swiper-banner-p',
            dynamicBullets: true,
            },
          });

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

}
</script>
<style lang="scss" >
@import '../../styles/common/common.scss';
.home {
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
      width: 25%;
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
        width: 33.33%!important;
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
