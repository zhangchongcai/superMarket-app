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
            <h1 class="project-title">慧影云</h1>
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
                    <span class="head-cinema-name">北京自由人影城</span>
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
                    text: "影票",
                    icon: "neiye-zhijieshenhe",
                    path: "/home",
                    params: {},
                    children: [
                        {
                            text: '总部影片管理',
                            path: '/home',
                            title: '总部影片管理',
                            params: {}
                        },
                        {
                            text: '影片资料管理',
                            path: '/CTM/Film_manage/cinema_stock/list',
                            title: '影片资料管理',
                            params: {}
                        },
                    ]
                    
                },
                {
                    text: '商品分类',
                    icon: 'neiye-zhijieshenhe',
                    path: '/sort',
                    params: {},
                    children: []
                }
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
            font-size: 18px;
            line-height: 25px;
            letter-spacing: 3.5px;
            font-weight: 800;
            display: block;
            text-align: center;
            margin-bottom: 20px;
            padding: 10px 0;
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
