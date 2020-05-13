# vue-shopping
-- 环境配置

	- 安装依赖：npm install
	- 启动：npm run dev
	- 发布：npm run build
	
	- 配置：webpack.dev.conf.js
	- 入口文件：main.js
	- vue根组件：App.vue
	- 页面跳转：vue-router
	- 状态管理：vuex


-- axios数据请求
	- 安装 nmp install --save axios
	- 在需要的页面引入axios

-- vue-infinite-scroll 分页插件
	- 安装 nmp install --save  vue-infinite-scroll
	- 在main.js中引入 infinite_scorll
	- vue.use(infinite_scorll) 使用该插件

-- vue-lazyload实现图片懒加载功能
	- 安装 npm install --save vue-lazyload
	- eg：<img v-lazy="'/static/' + item.prodcutImg" >
	- main.js中引入
	- 配置初始化加载图片
		Vue.use(lazyLoad,{
			loading:'static/loading-svg/loading-bars.svg',
		})

