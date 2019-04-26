import Vue from 'vue'
import Router from 'vue-router'
/*import HelloWorld from '@/components/HelloWorld'
import User from './../demo/Use-route.vue'
import User_name from '@/demo/Use-name-route.vue'
import User_list from '@/demo/Use-list-route'*/          //尾椎可加可不加

import GoodList from './../views/GoodsList.vue' //首页
import Cart from '@/views/Cart' //我的购物车
import Address from '@/views/Address'//地址
import OrderConfirm from '@/views/OrderConfirm.vue'//下一步
import OrderSuccess from '@/views/OrderSuccess'
 


Vue.use(Router)

export default new Router({
    routes:[
        {
          path:'/',
          name:'GoodList',
          component:GoodList,
        },
        {
          path:'/cart',
          name:'Cart',
          component:Cart,
        },
        {
          path:'/address',
          name:'Address',
          component:Address,
        },
        {
          path:'/orderConfirm',
          name:'OrderConfirm',
          component:OrderConfirm,
        },
        {
          path:'/orderSuccess',
          name:'OrderSuccess',
          component:OrderSuccess
        }
    ]
  
  /*routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
    	path:'/user:id',  //父级路由
    	name:'userPage',
    	component:User,
    	children:[   //嵌套的子路由路由
            {        //姓名页面
            	path:'userName:name_id',
              name:'names',
            	component:User_name

            },
            {
            	path:'userList',
            	component:User_list
            }
    	]
    }
  ]*/
})
