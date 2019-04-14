<template>
    <div>
        <van-nav-bar title="编辑地址" left-text="返回"
        left-arrow @click-right="onClickRight" @click-left="onClickLeft">
        <van-icon name="edit" slot="right" />

        </van-nav-bar>
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :address-info="addressInfo"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        
        />
    </div>
</template>
<script>
import { AddressEdit ,Toast ,NavBar} from 'vant';
import addres from './address.js'
import Vue from 'vue'
Vue.use(AddressEdit).use(NavBar);
export default {
    componetns: {NavBar,AddressEdit},
    data() {
        return {
            areaList:{
                'province_list':addres.province_list,
                'city_list':addres.city_list,
                'county_list': addres.county_list
            },
            searchResult: [{
                name: '广西科技大学鹿山学院',
                address: '柳州鱼峰区'
                }],
            addressInfo:{}
        }
    },

    methods: {
        onSave(item) {
            let user = sessionStorage.getItem('user')
            item.user = user
            console.log(item)
            this.$api.addressAdd(item).then(res => {
                if(res.code==200) {
                    Toast('保存成功！');
                    this.$router.go(-1)
                }
            })
        },
        onDelete(item) {
            console.log(item)
            let user = sessionStorage.getItem('user')            
            this.$api.addressRemove({'user':user,'id':item._id}).then(res => {
                if(res.code=200){
                    Toast('删除成功！');
                    this.$router.go(-1)
                }
            })
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('保存')
        },
        onChangeDetail(item) {
            console.log(item)
        }
    },
    created() {
        let user = sessionStorage.getItem('user')
        let id = this.$route.query.id
        if(id){
            this.$api.addressFindone({'user':user,'_id':id}).then(res => {
                if(res.code==200) {
                    let data = res.data[0]
                    data.addressDetail = data.address
                    this.addressInfo = data
                    this.isDefault = data.isDefault=="true"?true:false
                    console.log(typeof(data.isDefault),data.isDefault)
                }
            })
        }
    }
}
</script>


