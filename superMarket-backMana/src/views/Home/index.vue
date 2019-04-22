<template>
  <div class="main">
    这是首页
      <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
      <el-button type="primary" @click="insert" icon="el-icon-search">插入</el-button>
      {{num}}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      data:{},
      num:0
    }
  },
  methods:{
    search() {},
    insert() {
      this.$api.shenqianAdd({"productsLis":this.data}).then(res => {
        this.$nextTick(_=> {

        })
      this.num+=5
        console.log(res)
      })
    }
  },
  created() {
    // this.axios('apis/wap/index/3').then(res => {
    //   this.data = res.data.data.productsListWrap.productsList.slice(this.num,this.num+5)
    //   console.log(this.data)
    // })
    let user = window.sessionStorage.getItem('user')
    console.log(user)
    if(!user) {
      this.$router.push({path:'/user/login'})
    }
  }

}
</script>
<style scoped>

</style>
