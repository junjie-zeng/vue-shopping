var express = require('express');
var router = express.Router();

//引用日期工具类
require('./../util/util')
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
            	msg:err.message,
                result:''
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

        	}else{
                res.json({
                    status:"1",
                    msg:'用户名或密码错误',
                    result:''
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

//获取购物车数量
router.get('/getShoppingCartCount',function(req,res,next){
    if(req.cookies && req.cookies.userId){
         var userId = req.cookies.userId;
         Users.findOne({userId:userId},function(err,doc){
            if(err){
                res.json({
                    status:'1',
                    msg:err.message,
                    result:''
                })
            }else{
                //获取购物车
                var cartList = doc.cartList;  
                //定义商品数量
                var cartNum = 0;
                //遍历购物车，并累加商品数量
                cartList.map((item)=>{
                    cartNum += parseInt(item.productNum);
                })
                //返回商品数量
                res.json({
                    status:'0',
                    msg:'',
                    result:cartNum
                })
            }
         })
    }
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
        checkAll = req.body.checkAll ? "1" : "0";

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

//地址获取
router.get("/addressList",function(req,res,next){
    var userId = req.cookies.userId;
    Users.findOne({userId:userId},function(err,doc){
        if(err){
            res.json({
                status:"1",
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:"0",
                msg:'',
                result:doc.addressList
            })
        }
    })
})

//设置默认的地址
router.post('/setDefault',function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
        console.log('------------------------------------------')
        console.log('addressId--:' + addressId)
        console.log('------------------------------------------')
    if(!addressId){
        res.json({
            status:'1',
            msg:"userId 为空",
            result:''
        })
    }else{
        Users.findOne({userId:userId},function(err,doc){
            if(err){
                res.json({
                    status:'1',
                    msg:err.message,
                    result:''
                })
            }else{
                var addressList = doc.addressList;
                addressList.forEach((item)=>{
                    if(item.addressId == addressId){
                        item.isDefault = true;
                    }else{
                        item.isDefault = false;
                    }
                });
                doc.save(function(err1,doc1){
                    if(err1){
                        res.json({
                            status:'1',
                            msg:err1.message,
                            result:''
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'成功',
                            result:''
                        })
                    }
                })
            }

        })
    }
})

//添加地址
router.post("/addAddress",function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        userName = req.body.userName,
        streetName = req.body.streetName,
        postCode = req.body.postCode,
        tel = req.body.tel,
        isDefault = req.body.isDefault;

        console.log('------------------------------------------')
        console.log('isDefault--:' + isDefault)
        console.log('------------------------------------------')
        Users.findOne({userId:userId},function(err,doc){
            if(err){
                res.json({
                    status:'1',
                    msg:err.message,
                    result:''
                })
            }else{
                doc.addressList.push({ //添加地址
                    addressId:addressId,
                    userName:userName,
                    streetName:streetName,
                    postCode:postCode,
                    tel:tel,
                    isDefault:isDefault
                });

                if(isDefault){ //在添加地址之后如果确定了地址为默认地址，则重新遍历list将当前地址设为默认
                    doc.addressList.forEach((item)=>{
                        if(item.addressId == addressId){
                            item.isDefault = true;
                        }else{
                            item.isDefault = false;
                        }
                    })
                }

                doc.save(function(err1,doc1){//更新
                    if(err1){
                        res.json({
                            status:'1',
                            msg:err.message,
                            result:''
                        })
                    }else{
                        res.json({
                            status:'0',
                            msg:'添加成功',
                            result:''
                        })
                    }
                }) 
            }

        })


})

//删除地址
router.post("/delAddress",function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    Users.update({
        userId:userId
    },{
        $pull:{
            'addressList':{
                'addressId':addressId
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
})

//订单支付
router.post('/payMent',function(req,res,next){
    var userId = req.cookies.userId,     //用户id
        addressId = req.body.addressId,  //地址id
        orderTotal = req.body.orderTotal; //总金额
    Users.findOne({userId:userId},function(err,doc){  //根据用户id查询数据
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            var address = '',
                goodsList = [];
            //获取当前用户地址信息
            doc.addressList.forEach((item) =>{
                if(addressId == item.addressId){   
                    address = item;
                }
            })
            //获取当前用户商品信息
            doc.cartList.forEach((item)=>{
                if(item.checked == "1"){
                    goodsList.push(item);
                }
            })

            //生成订单标识
            var platform = 'zjj';
            var d1 = Math.floor(Math.random()*10);
            var d2 = Math.floor(Math.random()*10);
            var sysDate = new Date().Format('yyyyMMddhhmmss');//系统时间
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');//当前时间
            var orderId = platform + d1 + sysDate + d2; //订单id

            var order = {
                orderId:orderId,       //订单id
                orderTotal:orderTotal,  //总金额
                addressInfo:address,    //地址信息
                goodsList:goodsList,   //商品信息
                orderStatus:'1',       //状态
                createDate:createDate  //当前时间
            }

          /*  console.log('------------------------------------------')
            console.log('orderId--:' + order.orderId)
            console.log('orderTotal--:' + order.orderTotal)
            console.log('addressInfo--:' + order.addressInfo)
            console.log('createDate--:' + order.createDate)
            console.log('------------------------------------------')  */          

            doc.orderList.push(order);  //将对象放入订单数组中

            doc.save(function(err1,doc1){ //更新
                if(err1){
                    res.json({
                        status:'1',
                        msg:err1.message,
                        result:''
                    })
                }else{
                    res.json({
                        status:'0',
                        msg:'',
                        result:{ //返回订单id与总金额
                            orderId:order.orderId,
                            orderTotal:order.orderTotal
                        }                        
                    })
                }
            })


        }
    })
})

//订单明细 获取订单id与总价
router.get('/orderDetailed',function(req,res,next){
    var userId = req.cookies.userId,
        orderId  = req.param('orderId');
    //根据用户id进行查询
    Users.findOne({userId:userId},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            var orderList = doc.orderList; //订单List
            if(orderList.length > 0){     //当有订单的时候，将订单总价保存起来
                var orderTotal = 0;
                orderList.forEach((item)=>{   //遍历订单List，根据订单id去找当前的订单，保存订单总价
                    if(orderId == item.orderId){
                        orderTotal = item.orderTotal;
                    }
                })

                //如果订单z总金额大于0 则返回，否则为无效订单
                if(orderTotal > 0){
                    res.json({
                        status:'0',
                        msg:'',
                        result:{
                            orderId:orderId,            //订单id
                            orderTotal:orderTotal       //订单总金额
                        }
                    })
                }else{
                    res.json({
                        status:'1',
                        msg:'无效订单',
                        result:''
                    })
                }

            }else{
                res.json({
                    status:'1',
                    msg:'当前用户未创建订单',
                    result:''
                })
            }
        }
    })

})

module.exports = router;
