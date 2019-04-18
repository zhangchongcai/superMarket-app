<template>
    <div class="collapse">
            <div v-for="(item,ind) in dataList" :key="ind">
                <van-collapse v-model="activeNamesList" v-if="item.children" >
                    <van-collapse-item  :name="ind" :title="item.catName"  :key="ind" icon="shop-o">
                        <ul class="coll-warp" >
                            <li v-for="(children,ind) in item.children" :key="ind">{{children.catName}}</li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>
                <van-cell :title="item.catName" is-link  v-else  arrow-direction="down"/>
            </div>
    </div>
</template>

<script>
import { Collapse,CollapseItem,Cell } from 'vant';
import Vue from 'vue'
Vue.use(Collapse).use(CollapseItem).use(Cell);
export default {
    props:{
        dataList:{type:Array,defuat:[]},
        activeNames:{type:Array,defuat:['0']}
    },                                       
    data() {
        return {
            activeNamesList:['0']
        };
    },
    created() {
        this.activeNamesList = this.activeNames
    }
}
</script>
<style lang="scss">
    .collapse{
        .coll-warp{
            li{
                display: inline-block;
                margin-right: .5rem;
            }
        }
        .van-cell__left-icon{
            color: #f44;
        }
    }
</style>



