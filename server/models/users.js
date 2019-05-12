var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({ //模型 加入购物车
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
        {
            "productId":String,
            "productName":String,
            "prodcutPrice":String,
            "prodcutImg":String,
            "checked":String,
            "productNum":String,

        }
     ],
     "addressList":Array
});

module.exports = mongoose.model("User",userSchema)