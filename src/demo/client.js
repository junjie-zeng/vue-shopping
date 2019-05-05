let http = require('https');
let util = require('util');

http.get('https://wx.focussend.com/search/getCategory?type=200',function(res){
    let data = '';
    res.on('data',function(chuck){
        data += chuck;
    });

    res.on('end',function(){
    	//let result = JSON.parse(data);
    	//console.log("result" + util.inspect(result))
    	console.log("data" + data)
    })

})