<template>
    <ul class="aside-list">
        <template v-for="(item, i) in items">
            <li
                class="title"
                v-if="item.title"
                :key="i"
            >{{ item.title }}</li>
            <li
                class="item"
                v-else
                :key="i"
            >
                <router-link
                    :to="item"
                    :title="item.text"
                ><i :class="'iconfont icon-' + item.icon"></i><span>{{ item.text }}</span></router-link>
                <ul
                    class="list"
                    v-if="item.children"
                >
                    <template v-for="(sub, s) in item.children">

                        <li
                            class="divider"
                            v-if="sub.divider"
                            :key="s"
                        ></li>
                        <li
                            class="item"
                            v-else
                            :key="s"
                        >
                            <router-link
                                :to="sub"
                                :title="sub.text"
                            >{{ sub.text}}</router-link>
                        </li>
                    </template>
                </ul>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
    name: "menu-list",
    props: {
        items: Array
    },
    methods: {
    }
};
</script>

<style lang='scss'>
.aside-list {
    display: block;
    color: #fff;
    > .item {
        position: relative;
        box-sizing: border-box;
        padding: 10px 10px;
        > a {
          display: block;
          color: #fff;
          font-size: 15px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          > span {
                vertical-align: middle;
                margin-left: 12px;
          }
        }

        > .list {
          display: none;
          list-style: none;
        //   padding:  .875rem;


          > .item {
            > a {
              display: block;
            //   padding: .25rem;
            //   font-size: .8125rem;
              color: #fff;
              white-space: nowrap;
              overflow: hidden;
            }

            &.active a {
              color: #fff;
            }

            &:hover a {
              color: #fff;
            }
          }
        }

        &:hover {
            background-color: #fff;
            > a {
                color: #3B74FF;
            }
            > .list {
                display: block;
                position: absolute;
                top: 0;
                left: 100%;
                z-index: 99999;
                width: 414px;
                background-color: #fff;
                padding: 24px;
                box-sizing: border-box;
                box-shadow: 4px 4px 12px 0 rgba(0,0,0,0.20);
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                > .item {
                    display: inline-block;
                    width: 114px;
                    margin-bottom: 15px;
                    > a {
                        color: #666;
                        font-size: 14px
                        // &:hover {
                        //     color: #3B74FF;;
                        // }
                    }
                }
            }
            }

        &.active {
          > a {
            color: #fff;
            // background: $menu-item-active-background;

          > .list {
            display: block;
            position: static;
          }
        }
      }
    }
}
</style>