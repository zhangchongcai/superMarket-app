<template>
    <div class="typelist_new">
        <toBack :title=headerTitle></toBack>
        <ul>
            <li v-for="n in 12" :key="n" @click="toDetial">
                <div class="img-block">
                    <img src="http://image.chijiayd.com/group1/M00/09/97/rBJ8J1xnzTOAFlMkAAAiEKwb_9o005.jpg" alt="">
                </div>
                <p class="description">双萌 室内浴室拖鞋 D11W 黑色  44-45码</p>
                <div class="red">￥12  
                    <CarBtn></CarBtn>  
                </div>
            </li>
        </ul>
        
    </div>
</template>
<script>
import '../../../assets/fonts/iconfont.css';
import CarBtn from '../../../components/CarBtn';
import toBack from '../../../components/Toback';
export default {
    components:{CarBtn,toBack},
    data() {
        return {
            selected:1,
            headerTitle:'新品',
        }
    },
    methods: {
        toDetial() {
            this.$router.push('/detail')
        }
    },
    created() {},
    mounted() {},
    
}
</script>
<style lang="scss">
    .typelist_new{
        ul{
            overflow: hidden;
            li{
                float: left;
                width: 50%;
                padding: .093333rem .2rem;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-size: .373333rem;
                line-height: .533333rem;
                .img-block{
                    width: 3.733333rem;
                    margin: 0 auto;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                p{
                    text-indent: rem(1.6);
                    padding-left: 0.45rem;
                }
                .red{
                    color: #df0f24;
                    padding: 0 0.45rem;
                }
            }
        }
    }
</style>

