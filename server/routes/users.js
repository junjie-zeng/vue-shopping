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
    //将userId清空（其实就是覆盖）
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


//我的购物车
router.get("/cartList",function(req,res,next){
    //获取用户id
    var userId = req.cookies.userId;
    //根据用户查询当前用户的购物车
    Users.findOne({userId},function(err,doc){
        if(err){//错误返回
            res.json({
                status:'1',
                msg:err.message,
                result
            })
        }else{//成功返回
            if(doc){
                res.json({
                    status:'0',
                    msg:"",
                    result:doc.cartList      //购物车数据
                })
            }
        }

    })
})

//删除商品
router.post("/delCart",function(req,res,next){
    //获取用户id
    var userId = req.cookies.userId,
        //商品id
        productId = req.body.productId; 
    Users.update({
        userId:userId
    },{
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    },function(err,doc){
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            })

        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'成功',
                    result:'success'
                })
            }
        }
    });
});

//修改商品（数量）
router.post('/editCart',function(req,res,next){
    //获取用户id
    var userId = req.cookies.userId,
        productId = req.body.productId,         //商品ID
        productNum = req.body.productNum,       //商品数量
        checked = req.body.checked;             //是否选中

    console.log('------------------------------------------')
    console.log('productId--:' + productId)
    console.log('productNum--:' + productNum)
    console.log('checked--:' + checked)
    console.log('------------------------------------------')

    Users.update({
        'userId':userId,
        'cartList.productId':productId,         //商品数量
    },{
        "cartList.$.productNum":productNum,
        "cartList.$.checked":checked,
    },function(err,doc){
       if(err){
           res.json({
              status:'1',
              msg:err.message,
              result:''
           })
       }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'成功',
                    result:'success'
                })
            }
       }
    })
})

//商品全选与反选设置
router.post('/editCheckAll',function(req,res,next){
    var userId = req.cookies.userId,
        checkAll = req.body.checkAllFlag ? "1" : "0";

    Users.findOne({userId:userId},function(err,userDoc){
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            if(userDoc){
                userDoc.cartList.forEach((item)=>{
                    item.checked = checkAll;
                });
                userDoc.save(function(err1,doc1){
                    if(err1){
                        res.json({
                            status:'1',
                            msg:err.message,
                            result:''
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功',
                            result:'success'
                        })

                    }
                })
            }
        }
    })
})

module.exports = router;
