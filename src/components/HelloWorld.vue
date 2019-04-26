<template>
  <div class="hello">
    
       <div>
           这是首页{{num}}
       </div>
       <Use_route :num = num @incre = 'increase' @redu = 'reduce'></Use_route>
  </div>
</template>

<script>
import Use_route from './../test-route/Use-route.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      num:0
    }
  },
  components:{
    Use_route
  },
  methods:{
    increase(){
        this.num ++ ;
    },
    reduce(){
      this.num -- ;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
