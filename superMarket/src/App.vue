<template>
  <div id="app">
      <router-view/>
      <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from "./components/Tabbar";

export default {
  name: 'App',
  components:{Tabbar}
}
</script>

<style lang='scss'>
body,html{height: 100%;}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content{
    flex: 1;
  }
  .tabbar{
    height: 51px;
  }
}
</style>
