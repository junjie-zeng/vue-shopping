// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from 'vue-lazyload'
import infinite_scorll from 'vue-infinite-scroll'
import {currency} from './util/currency.js'
import Vuex from 'vuex'

//css
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'


//分页插件
Vue.use(infinite_scorll)

//图片懒加载
Vue.use(lazyLoad,{
	loading:'static/loading-svg/loading-bars.svg',
	try:3 //默认一
})

//金额全局过滤
Vue.filter("currency",currency)

//使用vuex
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		nickName:'',                //用户名
		shoppingCartCount:0,        //商品数量
	},
	mutations:{
		//用户名
        updateCurrentUser(state,name){
        	state.nickName = name;

        },
		//通过一些调用，改变购物车数量
        updateShoppingCartCount(state,count){
        	state.shoppingCartCount += count;
        },
        //初始化购物车数量
        initShoppingCartCount(state,count){
            state.shoppingCartCount = count;
        }
	}

})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//路由
  store, //使用vuex
  components: { App },
  template: '<App/>'
})
