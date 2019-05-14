//module.exports
//mongoose 提供require类库，所以不用指定路径

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produtSchema = new Schema({
	"productId":{type:String},
	"productName":String,
	"prodcutPrice":Number,
	"prodcutImg":String,
	"checked":String,
	"productNum":Number
})

module.exports = mongoose.model('Good',produtSchema);    //第三个参数用于关联集合数据库里面的名字 eg:module.exports = mongoose.model('Good',produtSchema,"goods");  

//emd amd（es5规范） exprots(node规范)


/*	"checked":String,
	"productNum":Number,*/