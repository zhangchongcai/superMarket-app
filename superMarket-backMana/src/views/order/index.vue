 <template>
    <div>
        <Order></Order>
        <router-view></router-view>
    </div>     
 </template>
 
 <script>
 import Order from './order';
 export default {
     name:"订单详情",
     components:{Order}
 }
 </script>
 
 <style>
 
 </style>
 