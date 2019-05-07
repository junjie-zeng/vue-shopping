// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from 'vue-lazyload'
import infinite_scorll from 'vue-infinite-scroll'
//css
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

//图片懒加载
Vue.use(lazyLoad,{
	loading:'static/loading-svg/loading-bars.svg',
	try:3 //默认一
})

//分页插件
Vue.use(infinite_scorll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
