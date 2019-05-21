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
     "addressList":[
         {
            "addressId":String,
            "userName":String,
            "streetName":String,
            "postCode":String,
            "tel":String,
            "isDefault":Boolean
         }
     ]
});

module.exports = mongoose.model("User",userSchema)




