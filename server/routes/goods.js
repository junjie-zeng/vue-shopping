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
	Goods.find({},function(err,doc){
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