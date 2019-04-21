<template>
	<div class='back-top' 
	v-scroll-hide='isShow'  
    scroll-hide-distance="300"
    v-go-top:click
	>
	<!-- v-go-top:click='12313'   -->
<!-- 
v-backtop-hide 通过一个自定义指令来监听页面滚动事件

 -->     
 		<transition
		   enter-active-class='fadeIn animated'
		    leave-active-class='fadeOut animated'
 		>
	 	 <div class='contain-box' v-show='isShow' style="background:#666">
	 	 	<i class="fa fa-arrow-up"></i>
	 	 </div>
	 	</transition>
	</div>
</template>
<script>
export default{
	name:'back-top',
	data(){
		return {
			isShow:false
		}
	}
}
</script>
<style lang='less' scoped>
@import url('../styles/animate.css');
.back-top{
	   position: fixed;
		z-index: 9999;
       right: 5%;
       bottom: 15%;
	.contain-box{
		width: 40px;
		height: 40px;
		font-size:25px;
        border-radius: 50%;
        background: skyblue;
        color:#fff;
        display: flex;
        justify-content: center;
        align-items:center;
	}
	&[size='small']{
		.contain-box{
		width: 40px;
		height: 40px;
		font-size:20px;
	    }
	}
	&[size='big']{
		.contain-box{
		width: 80px;
		height: 80px;
		font-size:40px;
	    }
	}
}	
</style>