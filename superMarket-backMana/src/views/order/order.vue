<template>
    <div class="order">
        <div class="header">详情</div>
        <div class="container">
            <div class="goods-warp">
                <div class="sell_ticket">
                    <span class="warp_title">电影票：2</span>
                    <div class=""></div>
                </div>
                <div class="sell_good">
                    <span class="war_title">卖品：4</span>
                </div>
            </div>
            <div class="detial-warp">
                <span class="warp_title">已支付明细:3</span>
                <div class="money">
                    <div class="row-item">
                        <span>现金</span>
                        <span>500.元</span>
                        <span class="iconfont icon-neiye-shanchu"></span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'订单详情',

}
</script>
<style lang="scss">
    .order{
        background: #f5f5f5;
        overflow: hidden;
        .header{
            color: #FFFFFF;
            font-size: 18px;
            padding: 10px 20px;
            background: #3559AF;
        }
        .warp_title{
            display: inline-block;
            font-family: MicrosoftYaHei-Bold;
            color: #333333;
            font-weight: 600;
            font-size: 14px;
        }
        .container{
            height: 100%;
            overflow: hidden;
            display: flex;
            .goods-warp{
                background:#333333;
                height: 100%;
                flex: 1;
            }
            .detial-warp{
                width: 344px;
                float: right;
                background: lightblue;
                .money{
                    box-sizing: border-box;
                    width: 344px;
                    height: 189px;
                    padding: 10px 20px;
                    background: #FFFFFF;
                    .row-item{
                        
                    }
                    
                }
            }

        }
    }
</style>


