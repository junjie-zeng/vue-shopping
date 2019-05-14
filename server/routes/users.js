var express = require('express');
var router = express.Router();
//用户模型
var Users = require('./../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {   ///users 默认一级路由
  res.send('respond with a resource');
});

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
        				userName:doc.userName
        			}
        		})

        	}

        }
	})
})




module.exports = router;
