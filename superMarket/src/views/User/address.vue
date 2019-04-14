<template>
    <div>
      <van-nav-bar title="编辑地址" left-text="返回" 
        left-arrow  @click-left="onClickLeft">
        </van-nav-bar>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
        @select = "selectAddress"
        />
    </div>
</template>
<script>
import { AddressList ,Toast,NavBar} from 'vant';
import Vue from 'vue'
Vue.use(AddressList).use(NavBar);
export default {
  components:{NavBar,AddressList},
  data() {
    return {
      chosenAddressId: 0,
      list: [
        {
          id: '2',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ],
      disabledList: [
        {
          id: '1',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },

  methods: {
    onAdd() {
      this.$router.push({name:'addressEdit'})
    },
    onEdit(item, index) {
      this.$router.push({name:'addressEdit',query:{'id':item._id}})
    },
    onClickRight() {
      Toast('保存成功！');
      this.$router.push({name:'info'})
    },
    onClickLeft() {this.$router.go(-1)},
    selectAddress(val) {console.log(val)}
  },
  created() {
    let user = sessionStorage.getItem('user')
    this.$api.addressList({'user':user}).then(res => {
      if(res.code==200) {
        this.list = res.data
        this.list.forEach((item,ind) => {
          item.id = ind
        })
      }
    })
  }
}
</script>
<style lang="scss">

</style>


