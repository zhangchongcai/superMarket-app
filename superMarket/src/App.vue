<template>
  <div id="app">
      <router-view/>
      <back-top size=''></back-top>
  </div>
</template>
<script>
export default {
  name: 'App',
  components:{}
}
</script>
<style lang='scss'>
@import '@/styles/common/common.scss';
body,html{height: 100%;}
#app {
  height: 100%;
  font-size: rem(12);
}
</style>