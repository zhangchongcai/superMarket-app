<template>
    <div class="tag-nav">
        <scroll-bar ref="scrollBar">
            <router-link
                ref="tag"
                class="tag-nav-item"
                :class="isActive(item) ? 'cur' : ''"
                v-for="(item, index) in tagNavList"
                :to="{path: item.path, query: item.query}"
                :key="index">
                {{item.title}}
                <span
                    class='el-icon-close'
                    @click.prevent.stop="closeTheTag(item, index)"
                ></span>
            </router-link>
            <!-- <div class="tags-ctrl">
                <span class="el-icon-arrow-left"></span><span class="el-icon-arrow-right"></span>
            </div> -->
        </scroll-bar>
    </div>
</template>

<script>
import ScrollBar from '../../components/ScrollBar/ScrollBar'
export default {
    data() {
        return {
            defaultPage: "/home"
        };
    },
    computed: {
        tagNavList() {
            return this.$store.state.tagNav.openedPageList
        }
    },
    mounted() {
        // 首次加载时将默认页面加入缓存
        this.addTagNav()
    },
    watch: {
        $route() {
            this.addTagNav()
            this.scrollToCurTag()
        }
    },
    methods: {
        addTagNav() {
            // 如果需要缓存则必须使用组件自身的name(this.$router.getMatchedComponents()[1].name)，而不是router的name
            this.$store.commit("tagNav/addTagNav", {
                name: this.$route.name,
                path: this.$route.path,
                title: this.$route.meta.title,
                query: this.$route.query
            })
        },
        isActive(item) {
            return item.path === this.$route.path
        },
        closeTheTag(item, index) {
            // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
            // 如果没有前一个Tag，则加载默认页面
            this.$store.commit("tagNav/removeTagNav", item)
            if (this.$route.path == item.path) {
                if (index) {
                    this.$router.push(this.tagNavList[index - 1].path)
                } else {
                    this.$router.push(this.defaultPage)
                    if (this.$route.path == "/home") {
                        this.addTagNav()
                    }
                }
            }
        },
        scrollToCurTag() {
            this.$nextTick(() => {
                for (let item of this.$refs.tag) {
                    if (item.to.path === this.$route.path) {
                        this.$refs.scrollBar.scrollToCurTag(item.$el)
                        break
                    }
                }
            })
        }
    },
    components: {
        ScrollBar
    }
};
</script>

<style lang="scss">
.tag-nav {
    display: inline-block;
    width: calc(100% - 322px);
    height: 38px;
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    .tags-ctrl {
        width: 81px;
        height: 100%;
        // background-image: linear-gradient(-90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%);
        background-color: #fff;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
        box-sizing: border-box;
        // padding-left: 40px;
        padding-top: 12px;
    }
    .tag-nav-item {
        display: inline-block;
        position: relative;
        padding-left: 16px;
        height: 100%;
        line-height: 38px;
        margin-right: 3px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 120px;
        background-color: #fff;
        border: 1px solid rgb(245, 245, 245);
        border-bottom: none;
        font-size: 12px;
        color: #666;
        text-decoration: none;
        &:hover span {
            display: inline-block;
        }
        span {
            display: none;
            width: 16px;
            height: 16px;
            text-align: center;
            vertical-align: middle;
            position: absolute;
            top: 12px;
            right: 15px;
        }
        &.cur {
            border: none;
            background-color: #f2f4fd;
            color: #3b74ff;
            & span {
                display: inline-block;
                color: #3b74ff;
            }
        }
    }
}
</style>