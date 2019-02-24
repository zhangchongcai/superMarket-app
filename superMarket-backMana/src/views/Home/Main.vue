<template>
  <div class="home">
    home
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'Home',
  components:{ },
  data(){
    return{}
  },
  methods:{
    typelist_btn(item) {
        if(item==1) {
          this.$router.push('typelist/new')
        }
    }
  },
  mounted() {
  }

}
</script>
<style lang="scss" >
@import '../../styles/common/common.scss';
.home {
  
}


</style>
