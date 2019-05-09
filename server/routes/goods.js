var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("../models/goods");

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
                  priceGt = "0";                        //0--100
                  priceLte = "100";
                  break;
            case'1':
                  priceGt = "100";                      //100--500
                  priceLte = "500";
                  break;                  
            case'2':
                  priceGt = "500";                      //500--1000
                  priceLte = "1000";
                  break;                  
            case'3':
                  priceGt = "1000";                     //1000--10000
                  priceLte = "10000";
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
            		list:doc
            	}
            })
       }
	})
});

module.exports = router;