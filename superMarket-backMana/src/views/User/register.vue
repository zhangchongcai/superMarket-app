<template>
    <div class="reg">
        <div class="header">
            <mt-header title="注册">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div className="reg_form">
            <mt-field label="手机号：" placeholder="请输入手机号" type="tel" v-model="user"></mt-field>
            <mt-field label="密码：" placeholder="请输入密码" type="password" v-model="password1"></mt-field>
            <mt-field label="确认密码：" placeholder="请再输入密码" type="password" v-model="password2"></mt-field>
            <div>
                <mt-field label="验证码：" v-model="captcha">
                    <div @click="getCode">{{code}}</div>
                </mt-field>
            </div>
            <div class="btn">
                <mt-button type="primary" @click="reg">注册</mt-button>
            </div>
            
        </div>
        <div class="fastLogin">
            <span>已注册</span>
            <span @click="toLogin">登录</span>
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
        createCode() {
            var code = "";
            var codeLength = 4; //验证码的长度
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for(var i = 0; i < codeLength; i++) {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            this.code = code;
        },
        getCode(){
            this.createCode()
        },
        reg(){

        },
        toLogin(){
            this.$router.push('/user/login')
        }
    },
    created() {
        this.createCode()
    },
    
}
</script>
<style lang='scss'>
    .reg{
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


