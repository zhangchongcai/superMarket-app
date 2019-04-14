<template>
    <div class="typelist_new">
        <div class="header">
            <toBack :title=headerTitle></toBack>
        </div>
        <main class="main" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded" ref="loadmore"
            :autoFill="isAutoFill"
            
           >

            <ul>
                <li v-for="(item,ind) in list" :key="ind" @click="toDetial(item._id)">
                    <div class="img-block">
                        <img :src="item.url" alt="">
                    </div>
                    <p class="description">{{item.name}}</p>
                    <div class="red">￥{{item.price}}  <span style="color:#666;text-decoration: line-through;margin-left: .133333rem;" 
                    v-if="item.specPrice!='0'"
                    >￥{{item.specPrice}}</span>
                        <CarBtn></CarBtn>  
                    </div>
                </li>
            </ul>
            </mt-loadmore>
            <div v-if="allLoaded" style="text-align:center;color:#333;padding-bottom:.1rem">---我是有底线的---</div>
        </main>
        <div class="footer">
            <NewTabbar :active=1></NewTabbar>
        </div>
        <van-loading />
<van-loading color="white" />
    </div>
</template>
<script>
import CarBtn from '../../../components/CarBtn';
import toBack from '../../../components/Toback';
import NewTabbar from '@/components/NewTabbar'
import { Loading } from 'vant';
import Vue from 'vue'
Vue.use(Loading);
export default {
    components:{CarBtn,toBack,NewTabbar},
    data() {
        return {
            selected:1,
            headerTitle:'新品',
            page:1,
            pageSize:10,
            list:[],
            allLoaded:false,
            wrapperHeight:0,
            isAutoFill: false,//是否自动触发上拉函数
        }
    },
    methods: {
        toDetial(id) {
            this.$router.push({path:'/detail',query:{_id:id}})
        },
        getList() {
            let data ={
                page:this.page,
                limit:this.pageSize
            }
            this.$api.newProduct(data).then(res => {
                console.log(res.data)
                if(res.code==200){
                    this.list =this.list.length>0?this.list.concat(res.data.data) : res.data.data
                    if(this.page==1){
                        this.list = res.data.data
                        this.allLoaded = false
                    }
                    if(res.data.data.length<=0){
                        this.allLoaded = true //不让上拉
                    }
                }
            })
        },
        loadTop() {
            // 加载更多数据  下拉
            console.log('下拉')
            // this.allLoaded = true
            this.$refs.loadmore.onTopLoaded();
            this.page= 1
            this.getList()
        },
        loadBottom() {
            // 加载更多数据 上拉
            console.log('上拉')
            this.$refs.loadmore.onBottomLoaded();
            this.page+=1
            this.getList()
            // this.allLoaded = true
        }
    },
    created() {
        this.getList()
    },
    mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
    
}
</script>
<style lang="scss">
    .typelist_new{
        // display: flex;
        // height: 100vh;
        flex-direction: column;
        background: #f5f5f5;
        // overflow: hidden;
        .header{
            height: 40px;
            // position: fixed;
            // top: 0;
            // left: 0;
            // right: 0;
        }
        .main{
            flex:1;
            overflow: scroll;
        }
        // .footer{height: 50px}
        ul{
            padding:0 .2rem; 
            overflow: hidden;
            li{
                float: left;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                background: #fff;
                width: 49%;
                height: 6.7rem;
                padding: .093333rem .2rem;
                font-size: .373333rem;
                margin-bottom: 2%;
                .img-block{
                    width: 3.733333rem;
                    height: 3.733333rem;
                    margin: auto auto;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                p{
                    flex: 1;
                    text-indent: rem(1.6);
                    padding-left: 0.45rem;
                }
                .red{
                    color: #df0f24;
                    padding:  0.15rem;
                }
                &:nth-child(2n){
                    margin-left: 2%;
                }
            }
        }
    }
</style>

