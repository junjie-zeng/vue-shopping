var express = require('express');
var router = express.Router();
//用户模型
var Users = require('./../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {   ///users 默认一级路由
  res.send('respond with a resource');
});
//用户登入
router.post('/login',function(req,res,next){
	var param = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}

	console.log('userName：' + param.userName + 'userPwd：' + param.userPwd)

	Users.findOne(param,function(err,doc){ //根据用户名与密码查找用户表
		console.log('doc' + doc)
        if(err){
            res.json({
            	status:"1",
            	msg:err.message
            })
        }else{
        	if(doc){
        		//存放cookie 时间一小时
        		res.cookie("userId",doc.userId,{  
        			path:'/',
        			maxAge:1000*60*60
        		});
        		res.cookie("userName",doc.userName,{
        			patha:'/',
        			maxAge:1000*60*60
        		});

        		res.json({
        			status:"0",
        			msg:'',
        			result:{
        				userName:doc.userName   //返回用户名
        			}
        		})

        	}

        }
	})
})

//用户登出
router.post("/logout",function(req,res,next){
    res.cookie("userId","",{
        path:"/",
        maxAge:-1
    });
    res.json({
        status:"0",
        msg:"",
        result:"登出成功"
    })
})

//是否登入
router.get("/checkLogin",function(req,res,next){

    console.log('------------------------------------------')
    console.log('req.cookies.userId' + req.cookies.userId)
    console.log('------------------------------------------')
    //查找cookie中是否有userId，如果有userId则返回userName
    if(req.cookies.userId){
        res.json({
            status:"0",
            msg:"",
            result:req.cookies.userName || ""
        })
    }else{
        res.json({
            status:"1",
            msg:"未登入",
            result:""
        })
    }
})





module.exports = router;
