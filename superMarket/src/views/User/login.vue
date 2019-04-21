<template>
    <div class="login">
        <div class="header">
            <mt-header title="登录">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div class="logo-warp">
            <i class="fa fa-user-circle"></i>
            <p>
                <van-icon name="setting-o"  />
                <span>请登录您的账号</span>
                <van-icon name="setting-o"  />
            </p>
        </div>
        <div className="login_form">
            <!-- <mt-field label="手机号：" placeholder="请输入手机号" type="tel" v-model="userName"></mt-field>
            <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="userPass"></mt-field> -->
            <van-field
                v-model="userName"
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入手机号"
                left-icon="iconfont iconfont icon-zhuce"
                size="large"
                @click-right-icon="$toast('question')"
            />

            <van-field
                v-model="userPass"
                type="password"
                label="密码"
                size="large"
                left-icon="closed-eye"
                placeholder="请输入密码"
            />
        </div>
        <div class="btn">
            <mt-button type="primary" @click="login">登录</mt-button>
        </div>
        <div class="fastLogin">
            <span>未注册</span>
            <span @click="toReg">
                <span class="iconfont  icon-denglu" style="color:#26a2ff"></span>
                去注册</span>
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
import { Field } from 'vant';
import Vue from 'vue'
import {mapMutations} from 'vuex'
import {GET_CART_DATA} from '@/newVuex/types'

Vue.use(Field)
export default {
    components:{ Toast ,Field  },
    data(){
        return{
            userName:null,
            userPass:null,
        }
    },
    methods:{
        ...mapMutations([
            GET_CART_DATA
        ]),
        login(){
            let data = {
                userName:this.userName,
                userPass:this.userPass
            }
            if(this.userName && this.userPass) {
                this.$api.log(data).then(res => {
                    if(res.code ===200 && res.data){
                        localStorage.setItem('token',res.data.token);
                        window.sessionStorage["token"] = res.data.token;
                        window.sessionStorage["user"] = this.userName
                        Toast.success('登录成功！');
                        this.$api.cartList({'user':this.userName}).then(res => {
                            if(res.code){
                                this.GET_CART_DATA(res.data.data)
                            }
                        })
                        this.$router.push('/'); 
                        console.log('登录验证成功，返回的token：',res.data.token)
                    }else{
                        Toast.fail("账号密码错误")
                    }
                })
            }else {
                Toast.fail('请输入账号密码！');
            }
            
        },
        toReg(){
            this.$router.push('/user/reg')
        }
    },
    created() {
    },
    
}
</script>
<style lang='scss'>
    .login{
        .mint-cell-title{
            text-indent: 20px;
            text-align: right;
            padding-right:5px; 
        }
        .fastLogin{
            display: flex;
            padding: 1rem;
            font-size: .5rem;
            justify-content: space-between;
        }
        .btn{
            text-align:center;
            .mint-button{width: 80%}
        }
        .logo-warp{
            font-size: 2.5rem;
            color: #26a2ff;
            text-align: center;
            margin-bottom: .5rem;
            p{
                color: #666;
                font-size: .35rem;
            }
        }
    }
</style>


