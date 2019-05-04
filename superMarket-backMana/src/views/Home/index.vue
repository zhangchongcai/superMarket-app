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
      var imports = this.data[0]
      // let data = {
      //   Name:'进口休闲零食',
      //   titlePic:imports.titlePic,
      //   widgetId:imports.widgetId,
      //   widgetsInstanceList:imports.widgetsInstanceList[0]['productsList']
      // }
      // console.log(data)
      // this.$api.importProductsAdd(data).then(res => {
      //   console.log(res)
      // })

    //-------详情------------
    imports.widgetsInstanceList[0]['productsList'].forEach(item => {
      console.log(item.goodsId)
      
    })




    }

    
  },
  created() {
    this.axios('apis/special?specialId=60&specialType=1').then(res => {
      this.data = res.data.data.widgetsInstanceList
      console.log(this.data)
    })
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
