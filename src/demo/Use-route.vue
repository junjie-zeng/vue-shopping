<template>
  <div>
    
       <h3>这是用户首页   {{$route.params.id}}</h3>
       <button type="button" @click = "reduce">-</button>
            <span>子组件：{{num}}</span>
       <button type="button" @click = "increase">+</button>       
       <router-link :to = "{name:'names',params:{name_id:456}}">姓名页面</router-link>
       <router-link to = '/user:id/userList'>用户列表</router-link>
       <router-view></router-view>
   
  </div>
</template>
<script>


export default {
  props:['num'],
  name: '用户',
  data () {
    return {
     
      msg: 'Welcome user'
    }
  },
  methods:{
    increase(){
        this.$emit("incre");
    },
    reduce(){
      this.$emit("redu");
    }
  }
}
</script>

<style scoped>
 
</style>
