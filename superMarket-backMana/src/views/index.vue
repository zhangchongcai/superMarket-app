<template>
    <!-- <el-container class="main-container">
        <div v-wechat-title="$route.meta.title+'-影院运营管理系统'"></div>
        <el-header>
            <Head @collapsed='handleCollapse' @showResetPassword="showResetPassword"/>
        </el-header>
        <el-container>
            <el-aside :width="this.isCollapse?'60px':'200px'"> -->
    <!--如果合并时有冲突请使用这行代码-->
    <!-- <Menu :collapsed="isCollapse" />
            </el-aside>
            <el-main>
                <Tabs></Tabs>
                <div class="content-wrapper">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container> -->
    <el-container class="main-container">
        <el-aside :width="this.isCollapse ? '60px' : '136px'">
            <div class="project-title">
                <img src="../assets/img/touxiang.jpg" alt="">
                张经理
            </div>
            <Menu
                :collapsed="isCollapse"
                :items="item"
            />
        </el-aside>
        <el-main>
            <el-header height="56px">
                <!-- <Head @collapsed='handleCollapse' @showResetPassword="showResetPassword"/> -->
                <div class="head-cinema-info">
                    <span class="el-icon-location-outline"></span>
                    <span class="head-cinema-name">超市管理后台</span>
                </div>
                <Tabs></Tabs>
            </el-header>

            <div class="content-wrapper">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import navTab from "../components/Tabs/Tabs"
import menu from "../components/Menu/Menu"
export default {
    data() {
        return {
            isCollapse: false,
            item: [
                {
                    text: "主页",
                    icon: "main",
                    path: "/home",
                    params: {},
                },
                {
                    text: '数据管理',
                    icon: 'ic_contents1',
                    path: '/',
                    params: {},
                    children: [
                        {
                            text:'新品管理',
                            path:'/goodsmana/newproducts/list',
                            title:'新品管理',
                            params:{}
                        },{
                            text:'海外管理',
                            path:'/goodsmana/importproducts/list',
                            title:'海外管理',
                            params:{}
                        }
                    ]
                },
                {
                    text: '分类管理',
                    icon: 'iccontribute',
                    path: '/',
                },
                {
                    text: '图片管理',
                    icon: 'lunbotu',
                    path: '/',
                },
                {
                    text: '收藏管理',
                    icon: 'iccontribute',
                    path: '/',
                },
                {
                    text: '数据统计',
                    icon: 'iccontribute',
                    path: '/',
                },
               
            ]
        };
    },
    created() {},
    methods: {},
    name: "mainCon",
    components: {
        Tabs: navTab,
        Menu: menu
    }
};
</script>

<style lang='scss'>
.main-container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .el-header {
        height: 54px;
        padding-top: 16px;
        padding-left: 24px;
        box-sizing: border-box;
        box-shadow: 0 2px 7px 0 rgba(102, 102, 102, 0.1);
        .head-cinema-info {
            display: inline-block;
            height: 38px;
            width: 140px;
            color: #999;
            font-size: 0px;
            .el-icon-location-outline {
                margin-right: 6px;
                font-size: 14px;
            }
            .head-cinema-name {
                font-size: 14px;
                display: inline-block;
                height: 100%;
                line-height: 34px;
            }
        }
    }
    .el-aside {
        background: #21376b;
        color: #fff;
        overflow: visible;
        .project-title {
            height: 50px;
            width: 50px;
            font-size: 12px;
            line-height: 25px;
            letter-spacing: 3.5px;
            display: block;
            text-align: center;
            margin: 10px auto;
            img{
                width: 100%;
                height: 100%;
                border-radius:50%; 
                &:hover{
                    animation: mymove 3s infinite;
                }
                
            }
            @keyframes mymove {
                from {transform: rotate(0)}
                to {transform: rotate(360deg)}
            }
        }
    }
    .el-main {
        padding: 0;
        .content-wrapper {
            height: calc(100vh - 56px);
            overflow: auto;
            padding: 10px 24px 0 24px;
            box-sizing: border-box;
        }
    }
    // mmodal
    .el-dialog {
        border-radius: 5px;
        overflow: hidden;
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 0;
        }
    }

    .el-step.is-center .el-step__main {
        // text-align:left;
    }
    .el-step__icon.is-text {
        border-color: #303133;
        color: #303133;
    }
    .el-step__head.is-finish .el-step__icon.is-text,
    .forgot-pwd .content .el-step__head.is-success .el-step__icon.is-text {
        color: #ffa037;
        border-color: #ffa037;
        font-weight: bold;
    }
    .el-step__title.is-wait {
        color: #303133;
    }
}
</style>
