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
            <a href="javascript:void(0)" class="price" @click = 'sortGoods'>Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" >Filter by</a>
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
                       <!--  <a href="#"><img v-lazy="'/static/' + item.prodcutImg" alt=""></a>  -->
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    <img src="./../assets/loading-spinning-bubbles.svg" v-show = 'loading'>
                </div>
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
                goodList:[],             //所有数据
                loading:false,           //是否显示加载中 默认不显示当调用接口是显示，接口返回后隐藏
                priceCheck:'all',        //价格过滤
                sortFlag:true,           //是否排序
                page:1,                  //页码
                pageSize:2,              //两条
                busy:true,               //是否启用分页                
                priceFilter:[            //价格过滤
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
                
            }
        },
        components:{
          NavHeade,//头部
          NavBread,//面包屑
          NavFooter//底部
        },
        mounted:function(){
          this.getGoodList()     //初始化数据
        },
        methods:{
          getGoodList(flag){
              this.loading = true;           //调用接口显示加载中
              //参数
              var param  = {
                page:this.page,              //   页码
                pageSize:this.pageSize,      //   条数
                sort:this.sortFlag ? 1:-1,   //是否排序
                priceLevel:this.priceCheck,  //价格平均值
              };
              //模拟数据
              //axios.get('/api/goodList').then((res)=>{
              //获取商品数据
              axios.get('/goods',{
                params:param
              }).then((res)=>{
                 this.loading = false;           //接口返回数据后隐藏加载中
                //为true的话说明是调用分页
                if(flag){
                  this.goodList = this.goodList.concat(res.data.result.list); //通过concat与数据进行连接返回一个新的数据
                  if(res.data.result.count == 0){ //等于0说明没有数据，则禁止分页
                    this.busy = true;
                  }else{
                    this.busy = false;
                  } 
                }else{
                  this.goodList = res.data.result.list;
                  this.busy = false;
                  //console.log(this.goodList)
                }
                
              })
          },
          //价格导航
          setPriceFilter(index){
             this.priceCheck = index;
             this.page = 1;
             this.getGoodList();                //调用获取商品函数
          },
          //升序降序
          sortGoods(){
              this.sortFlag = !this.sortFlag;
              this.page =1;
              this.getGoodList();               //调用获取商品函数
          },
          //分页
          loadMore(){
              this.busy = true,
              setTimeout(()=>{
                this.page ++,                   //增加页码
                this.getGoodList(true)          //调用获取商品函数
              },500)
          }
        }
    }
</script>
