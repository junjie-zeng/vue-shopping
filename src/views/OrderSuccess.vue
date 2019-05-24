<template>
    <div>
      <nav-heade></nav-heade>
    
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{orderTotal | currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <a class="btn btn--m">Cart List</a>
              </div>
              <div class="btn-r-wrap">
                <a class="btn btn--m">Goods List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeade from '@/components/NavHeade'
    import NavFooter from '@/components/NavFooter' 
    import axios from './../../node_modules/axios/dist/axios.js'
    export default{
        data(){
            return{
              orderId:'',     //订单id
              orderTotal:0,   //订单总价
            }
        },
        components:{
          NavHeade,
          NavFooter
        },
        mounted(){
            //获取订单id与总价
            var orderId = this.$route.query.orderId;
            console.log('orderId-:' + orderId)
            //获取订单明细（订单id与总金额）
            axios.get('/users/orderDetailed',{params:{orderId:orderId}}).then((res)=>{
              if(res.data.status == "0"){
                  this.orderId = res.data.result.orderId;
                  this.orderTotal = res.data.result.orderTotal;
              }

            })
        }
    }
</script>
