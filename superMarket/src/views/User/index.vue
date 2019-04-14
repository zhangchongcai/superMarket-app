<template>
  <div class="user">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.van-nav-bar{
  span,.van-icon,.van-nav-bar__title, .van-ellipsis{color:#666}
}
</style>
