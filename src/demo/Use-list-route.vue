<template>
  <div>
    
       <h3>这是用户-列表页面</h3>
       <span @click = 'backHome'>返回首页</span>
   
  </div>
</template>

<script>
export default {
  name: '列表',
  data () {
    return {
      msg: 'Welcome user list'
    }
  },
  methods:{
  	backHome(){
      //编程式路由
      
  		//this.$router.push('/user:id=123') //字符串
      this.$router.replace({name:'userPage',params:{id:'123'}}) // 对象
     }
  }
}
</script>

<style scoped>
 
</style>
