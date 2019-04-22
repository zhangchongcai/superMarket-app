<template>
    <div class="bg">
        <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">           
            </div>         
            <div class="panel loginbox">
                <div class="text-center margin-big padding-big-top"><h1>后台管理中心</h1></div>
                <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="text" v-model="userName" class="input input-big" name="name" placeholder="登录账号" data-validate="required:请填写账号" />
                            <span class="icon icon-user margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="password" v-model="userPassword" class="input input-big" name="password" placeholder="登录密码" data-validate="required:请填写密码" />
                            <span class="icon icon-key margin-small"></span>
                        </div>
                    </div>
                
                </div>
                <div style="padding:0 30px;"><input type="submit" class="button button-block bg-main text-big input-big" @click="login" value="登录"></div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    components:{ },
    data(){
        return{
            userName:null,
            userPassword:null,
        }
    },
    methods:{
        login(){
            console.log(this.userName)
            console.log(this.userPassword)
            this.$api.login({"userName":this.userName,"userPass":this.userPassword})
            .then( data => {
                console.log(data)
                if (data && data.code === 200) {
                    if(data.data) {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                window.sessionStorage.setItem('user',this.userName)
                                this.$router.push('/')
                            }
                        })
                    }else{
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1000,
                            onClose: () => {
                                this.$router.push('/')
                            }
                        })
                    }
                } else {
                    this.$message({
                        message: '操作失败！',
                        type: 'failed',
                        duration: 1000,
                        onClose: () => {
                        }
                    })
                }
            }).catch( err => {
                console.log(err)
            })
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
@import '../../assets/css/pintuer.css';
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
    body{ color:#333; font-size:13px;}
    input,select,textarea{color:#333;}
    .bg{ width:100%; height:100%; position:absolute; background:url(~@/assets/image/bg.jpg) }
    .panel{background:#fff;padding-bottom: 20px}
    form .form-group:last-child{padding-bottom:0;}
    .passcode{position:absolute;right:0;bottom:0;height:32px;margin:1px;border-left:solid 1px #ddd;text-align:center;line-height:32px;border-radius:0 4px 4px 0;}
    ul,li{ list-style-type:none;}

    .lefter{position:relative;float:left;width:180px;margin-right:-180px;background:#e6f2fb;text-align:center;}
    .righter{float:right;width:100%;padding-top:15px;background:#e6f2fb;}
    .mainer{margin-left:180px;}
    .field-icon-right .icon{ bottom:0px; top:auto}
    .logo{ float:left; color:#FFF; margin-top:10px; line-height:45px;}
    .logo img{ float:left; margin-right:10px;}
    // .loginbox { background:url(../images/tmbg-white.png); border:0px;}
    /********头部******/
    .header{height:70px; overflow:hidden; background:url(~@/assets/image/bg.jpg) no-repeat 0 -1000px; }
    .head-l{ float:left; margin-top:17px; margin-left:15px; }
    .head-l .button{ padding:8px 15px;}
    .head-l .bg-blue:hover{ background-color:#03b6fd;}
    .leftnav{width:180px; height:100%; position:fixed; top:70px; left:0px;}
    .leftnav-title { height:50px; background:url(~@/assets/image/bg.jpg) no-repeat 0 -1000px;  color:#FFF; padding-left:22px;  font-size:14px; line-height:50px;}
    .leftnav-title span{ margin-right:10px;}
    .leftnav h2{ padding:10px 0 10px 22px; transition:all .1s ease-in-out; display:block; cursor:pointer; font-weight:bold; font-size:14px; border-top:1px solid #b5cfd9;}
    .leftnav h2.on{ color:#09c;}
    .leftnav .border-bottom{ border-bottom:1px solid #b5cfd9;}
    .leftnav h2 span{ margin-right:10px;}
    .leftnav h2:hover{ color:#09c;}
    .leftnav ul {display:none; border-top:1px solid #b5cfd9; padding:5px 0; opacity:1;}
    .leftnav ul li{ list-style-type:none;  }
    .leftnav ul li a{ display:block;padding-left:30px;line-height:30px; }
    .leftnav ul li span{ margin-right:8px;}
    .leftnav ul li a:hover,.leftnav ul li a.on{ color:#09c;}

    /***主要内容***/
    .admin{background:#fff;position:fixed;border-left:solid 1px #b5cfd9;right:0;bottom:0;top:110px;left:180px; padding:15px; padding-right:0px; padding-bottom:0px; overflow:auto; border-top:1px solid #b5cfd9; padding-right:15px;}
    .content{width:100%;}
    .body-content{padding:20px 0; overflow:hidden;}
    .content .title{ border-bottom:1px solid #dfdfdf; line-height:35px; font-size:14px; font-weight:bold; color:#09c}
    .form-x .form-group .label{ width:10%;}
    .form-x .form-button { margin-left:10%;}
    .w50 { width:25%; float:left;}
    .form-x .tipss{ float:left; padding-left:10px; color:#888; line-height:42px;}
    .input-help { float:left; line-height:20px;width: 300px;}
    .input-help li{ float:left;margin-left:10px;}
    .bread{ margin-left:190px; margin-top:4px;}
    .bread li{ float:left;}
    .label label{ font-weight:normal; color:#333;}
    .form-group{ margin-bottom:12px;}
    .button{ padding:10px 15px;}
    .form-group .field .file{ background:#FFF; border:0px;}
    .form-group .field input[type=radio]{ vertical-align:middle; line-height:35px; margin-right:5px;}
    .form-group .radio { line-height:35px;}
    .table th{ text-align:center;}
    .table td { vertical-align:middle;}
    .tip img{width:100px; height:100px;}
    .clear{ clear:both; overflow:hidden;}
    .pagelist {padding:10px 0; text-align:center;}
    .pagelist span,.pagelist a{ border-radius:3px; border:1px solid #dfdfdf;display:inline-block; padding:5px 12px;}
    .pagelist a{ margin:0 3px;}
    .pagelist span.current{ background:#09F; color:#FFF; border-color:#09F; margin:0 2px;}
    .pagelist a:hover{background:#09F; color:#FFF; border-color:#09F; }
    .pagelist label{ padding-left:15px; color:#999;}
    .pagelist label b{color:red; font-weight:normal; margin:0 3px;}

    .search{ overflow:hidden;}
    .search li{float:left; margin-right:15px; line-height:35px;}

    .button.bg-main.icon-check-square-o{ padding:10px 30px;}
    .button.bg-main.icon-check-square-o:hover{ background:#08bbe1;}
    input[type="checkbox"], input[type="radio"]{ width:15px; height:15px; vertical-align:-3px; margin-right:5px;}

    textarea[name=content]{width:100%; height:500px; border:1px solid #ddd; border-radius:3px; -webkit-border-radius:3px;}




</style>


