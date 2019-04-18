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
      num:2,
    }
  },
  methods:{
    search() {},
    insert() {
      this.axios('apis/wap/classify').then(res => {
      console.log(res.data)
      let data = this.data = res.data.data.goodsCats[this.num]
      this.$api.typeList(data).then(res => {
        console.log(res.data)
        this.num++
      })
      
    })
      
    }
  },
  created() {
    
  }

}
</script>
<style scoped>

</style>
