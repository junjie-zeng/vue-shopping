<template>
    <div>
      <!-- 头部组件 -->
      <nav-heade></nav-heade>
      <nav-bread>
          <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click = 'setPriceFilter("all")' :class = "{'cur':priceCheck == 'all'}">All</a></dd>
                <dd v-for = '(item,index) in priceFilter'>
               <a href="javascript:void(0)" @click = 'setPriceFilter(index)' :class="{'cur':priceCheck == index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
               
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for = 'item in goodList'>
                    <div class="pic">
                       <!--  <a href="#"><img :src="'/static/' + item.goodImg" alt=""></a>  -->
                    </div>
                    <div class="main">
                      <div class="name">{{item.goodName}}</div>
                      <div class="price">{{item.goodPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  <div class="md-overlay" ></div> -->
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeade from './../components/NavHeade'
    import NavBread from '@/components/NavBread'
    import NavFooter from '@/components/NavFooter'
    import axios from './../../node_modules/axios/dist/axios.js'
    export default{
        data(){
            return {
                goodList:[],            //所有数据
                priceFilter:[           //价格过滤
                    {
                      startPrice:0,
                      endPrice:100,
                    },
                    {
                      startPrice:100,
                      endPrice:500,
                    },
                    {
                      startPrice:500,
                      endPrice:1000,
                    }, 
                    {
                      startPrice:1000,
                      endPrice:10000,
                    },                                        
                ],
                priceCheck:'all'
            }
        },
        components:{
          NavHeade,
          NavBread,
          NavFooter
        },
        mounted:function(){
          this.getGoodList()
        },
        methods:{
          getGoodList(){
              axios.get('/api/goodList').then((res)=>{
                this.goodList = res.data.result;
                  //console.log(this.goodList)
              })
          },
          setPriceFilter(index){
             this.priceCheck = index;
          }
        }
    }
</script>
