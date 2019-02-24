<template>
    <div class="toback">
        <mt-header :title=title>
        <div slot="left" @click="handerClick">
            <mt-button icon="back"></mt-button>
        </div>
        <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    </div>
</template>
<script>
export default {
    name:'back',
    components: {},
    props:{
        title:{
            type:String,
            default:"铛铛网"
        }
    },
    data() {
        return {}
    },
    methods:{
        handerClick(){
            this.$router.go(-1);
            // this.$store.commit('');
            this.$store.commit('changeTabactive',true)
            console.log(this.$store.state.tabActive)
            // console.log(this.$store.state.tabActive,'sssss')
        }
    },
    created() {},
    mounted() {},
    
}
</script>
<style lang="scss">

</style>

