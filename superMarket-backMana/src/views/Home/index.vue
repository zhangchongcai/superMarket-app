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
    this.axios('apis/wap/index/3').then(res => {
      this.data = res.data.data.productsListWrap.productsList.slice(this.num,this.num+5)
      console.log(this.data)
      // this.list.forEach(item => {
      //     data = data.data.data;
          // item.groupProducts = data.groupProducts
          // let {product} = data 
          // let imageList = []
          // data.imageList.forEach(item => {
          //   imageList.push(item.url)
          // })
          // item.imageList = imageList
          // item.score = product.score
          // item.bn = product.bn
          // item.goodsPoint = product.goodsPoint
          // item.brand = product.brand
          // item.unit = product.unit
          // item.typeName = product.typeName
          // item.specPrice = product.specPrice
          // item.specTag = product.specTag
          // item.intro = product.intro
        // })
				
    })
  }

}
</script>
<style scoped>

</style>
