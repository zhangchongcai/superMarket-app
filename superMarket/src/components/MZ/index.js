import BackTop from './components/BackTog';
let  scrollEvent=function(distance,vnode){
	let bodyDistance=document.documentElement.scrollTop// 获取当前位置
	   //根据距离修改显示隐藏
  	if (bodyDistance>=distance) {
  		if (vnode.context.isShow==false) {
  			vnode.context.isShow=true
  		}
  		
  	}else{
  		if (vnode.context.isShow) {
  			vnode.context.isShow=false
  		}
  		
  	}
}

export default{
	install(Vue){
		// console.log('HEHEHEHEH')
		Vue.component('back-top',BackTop)
		Vue.directive('scroll-hide',{
        bind(el,binding,vnode){
          //  console.log(el)// 自定义指令绑定的节点
          //  console.log(binding)// 绑定对象
          //  console.log(vnode)// 虚拟dom
           // 
           let distance=el.getAttribute('scroll-hide-distance');//设定的fa值

          window.addEventListener('scroll',function(){
            scrollEvent(distance,vnode)
          })
         
        },
        unbind(el,binding,vnode){
        	//  console.log('解绑')
          let distance=el.getAttribute('scroll-hide-distance');//设定的fa值
        	   window.removeEventListener('scroll',function(){
               scrollEvent(distance,vnode)
              })

        }
		})
		//创建自定义指令
    // 实现回到顶部
    Vue.directive('go-top',{
      bind(el,binding,vnode){
          //监听元素是否被点击
          // console.log(binding)
          let eventType=binding.arg
          el.addEventListener(eventType,()=>{
            // console.log('点到我了')
            let timer ; 
            timer = setInterval(_=>{
               //获取滚动条高度
              var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
              var speed=Math.ceil(ostop/5);
              document.documentElement.scrollTop=document.body.scrollTop=ostop-speed;  
              if(ostop==0){
                clearInterval(timer);
               }
              //  console.log('定时器',ostop)
            },30)
          })
         // 
      }
    })

	}
}