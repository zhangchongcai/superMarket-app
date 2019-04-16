<template>
    <div class="collapse">
        <van-collapse v-model="activeNamesList">
            <van-collapse-item :title="item.catName" :name="ind" v-for="(item,ind) in dataList" :key="ind">
                <ul class="coll-warp" v-if="item.children">
                    <li v-for="(children,ind) in item.children" :key="ind">{{children.catName}}</li>
                </ul>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import Vue from 'vue'
Vue.use(Collapse).use(CollapseItem);
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
                margin-left: .5rem;
            }
        }
    }
</style>



