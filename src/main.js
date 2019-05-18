// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from 'vue-lazyload'
import infinite_scorll from 'vue-infinite-scroll'
import {currency} from './util/currency.js'

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



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
