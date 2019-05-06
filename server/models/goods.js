//module.exports
//mongoose 提供require类库，所以不用指定路径

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produtSchema = new Schema({
	"productId":{type:String},
	"productName":String,
	"prodcutPrice":Number,
	"prodcutImg":String
})

module.exports = mongoose.model('Good',produtSchema);

//emd amd（es5规范） exprots(node规范)


/*	"checked":String,
	"productNum":Number,*/