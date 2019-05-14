var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("../models/goods");//商品列表模型


var url = 'mongodb://127.0.0.1:27017/shopping';

//链接MongoDB
mongoose.connect(url,{useNewUrlParser:true});

mongoose.connection.on("connected",function(){
	console.log('连接成功')
});

mongoose.connection.on("error",function(){
	console.log('连接失败')
});

mongoose.connection.on("disconnected",function(){
	console.log('断开连接')
});

//获取goods数据
router.get("/",function(req,res,next){
	//res.send("hello,goods list");
      //分页操作
      let page = parseInt(req.param("page"));          //页数
      let pageSize = parseInt(req.param("pageSize"));  //数量
      let sort = req.param("sort");                    //升降序
      let skip = (page - 1) * pageSize;
      let priceLevel = req.param("priceLevel");        //价格水平
      var priceGt = '',priceLte = '';                  //价格最高与最低
      let params = {};
      //判断价格水平
      if(priceLevel !='all'){
         switch(priceLevel){ //根据传递过来的下标为最高与最低赋值
            case'0':
                  priceGt = 0;                        //0--100
                  priceLte = 100;
                  break;
            case'1':
                  priceGt = 100;                      //100--500
                  priceLte = 500;
                  break;             
            case'2':
                  priceGt = 500;                      //500--1000
                  priceLte = 1000;
                  break;                  
            case'3':
                  priceGt = 1000;                     //1000--10000
                  priceLte = 10000;
                  break;               
         }
         //往数据库传递价格的平均值
         params = {
            prodcutPrice:{
                  $gt:priceGt,                         //最低
                  $lte:priceLte                        //最高
            }
         }
      }

      

      let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
      goodsModel.sort({"prodcutPrice":sort});         //排序
      goodsModel.exec(function(err,doc){
	//Goods.find({},function(err,doc){
       if(err){
       	    res.json({
       	   	   status:"1",
       	   	   msg:err.message
       	    })
       }else{
            res.json({
            	status:"0",
            	msg:'',
            	result:{
            		count:doc.length,
            		list:doc,
                        test:{"测试":err}
            	}
            })
       }
	})
});

//加入购物车
router.post("/addCart",function(req,res,next){
      var userId = '100000077';                    //用户id
      var productId = req.body.productId;          //前端传递过来的额商品id
      //console.log(productId);
      var User = require("../models/users");       //用户models
      User.findOne({userId:userId},function(err,userDoc){ //根据用户id查找用户的一系列东西，userDoc为整个对象
          if(err){
               res.json({
                  status:"1",
                  msg:err.message
               })
          }else{
            console.log("userDoc" + userDoc);
            if(userDoc){
                  let goodsItem = '';                     //用于保存商品信息
                  //判断商品是否已经添加到购物车了，如果商品id相同说明已有该商品，则让商品数量加加
                  userDoc.cartList.forEach(function(item){
                      if(item.productId == productId){//id相同说明已有该商品
                         goodsItem = item;            //将商品信息存储起来
                         item.productNum ++;
                      }
                  })
                  //goodsItem 有值说明已经添加过购物车了，同时重新save让商品数量保存进去
                  if(goodsItem){
                        userDoc.save(function(err3,doc3){
                             if(err3){
                                  res.json({
                                    status:"1",
                                    msg:err3.message
                                 })
                              }else{
                                    res.json({
                                          status:'0',
                                          msg:'',
                                          result:'成功'
                                    })
                              }
                         })

                  }else{

                         Goods.findOne({productId:productId},function(err2,doc2){   //查询商品表中的数据
                             if(err2){
                                  res.json({
                                    status:"1",
                                    msg:err2.message
                                 })
                              }else{
                                 if(doc2){
                                     doc2.productNum = 1;
                                     doc2.checked = 1;
                                     userDoc.cartList.push(doc2);                  //将doc2返回过来的那一条数据添加至购物车
                                    // console.log("---------------------------------------");
                                    // console.log("doc2" + doc2);
                                    // console.log("---------------------------------------");
                                    // console.log("长度---"+ userDoc.cartList.length +"---userDoc.cartList--" + userDoc.cartList);
                                    // console.log("---------------------------------------");
                                     userDoc.save(function(err3,doc3){
                                         if(err3){
                                              res.json({
                                                status:"1",
                                                msg:err3.message
                                             })
                                          }else{
                                                res.json({
                                                      status:'0',
                                                      msg:'',
                                                      result:'成功'
                                                })
                                          }
                                     })
                                 }
                             }
                        })

                  }





                 
            }
          }
      })
})


module.exports = router;