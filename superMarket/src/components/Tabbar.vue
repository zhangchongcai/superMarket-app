<template>
	<div  v-if="active">
		<div class="tabberWarp">
			<div class="warp">
				<Item 
				:txt='item.txt' 
				:page='item.page' 
				:icon="item.icon"
				:isShow="item.isShow"
				@change='getVal' 
				v-for='(item,ind) in tabbarDes' 
				:sel='selected' :key="ind">
				</Item>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Item from './Item.vue'
	export default{
		components:{
			Item
		},
		data:function(){
			return{
				selected:'home',
				tabbarDes:[
					{
						txt:'首页',
						page:'home',
						normalImg:null,
                        activeImg:null,
                        icon:'fa fa-home fa-2x',
						isShow:true,
					},				
					{
						txt:'分类',
						page:'sort',
						normalImg:null,
                        activeImg:null,
						icon:'fa fa-navicon fa-2x',
						isShow:true,
					},
					{
						txt:'购物车',
						page:'cart',
						normalImg:null,
                        activeImg:null,
                        icon:'fa fa-shopping-cart fa-2x',
						isShow:false,
                        
					},
					{
						txt:'我的',
						page:'user',
						normalImg:null,
                        activeImg:null,
						icon:'fa fa-user-circle fa-2x',
						isShow:false,
					},
				]
			}
		},
		methods: {
			getVal:function(res) {
				this.selected = res;
			}
		},
		computed:{
			active () {
				return this.$store.state.tabActive
			}
		},
		created() {
			this.active
		}
	}
</script>
<style type="text/css">
	.warp{
		width: 100%;
		border-top: 1px solid #eee;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 0;
	}
	.warp img{
		width: 20px;
		height: 20px;
	}
	.tabberWarp img{
		margin-top: 10px;
		margin-bottom: 5px;
	}
	.tabberWarp{
		width: 100%;
		z-index: 9999;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding-bottom: 5px;
		background: #fff;
	}
</style>
