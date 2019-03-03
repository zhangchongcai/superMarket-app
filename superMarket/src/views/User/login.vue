<template>
    <div class="login">
        <div class="header">
            <mt-header title="登录">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div className="login_form">
            <mt-field label="手机号：" placeholder="请输入手机号" type="tel" v-model="user"></mt-field>
            <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="password1"></mt-field>
        </div>
        <div class="btn">
            <mt-button type="primary" @click="login">登录</mt-button>
        </div>
        <div class="fastLogin">
            <span>未注册</span>
            <span @click="toReg">去注册</span>
        </div>
    </div>
</template>
<script>

export default {
    components:{ },
    data(){
        return{
            user:null,
            password1:null,
            password2:null,
            captcha:null,
            code:"",
        }
    },
    methods:{
        login(){},
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
    }
</style>


