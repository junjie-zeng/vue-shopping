var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var ejs = require('ejs');

var logger = require('morgan');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//goods
var goods = require('./routes/goods');
//users
var users = require('./routes/users')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//未登入的拦截
app.use(function(req,res,next){
	//如果包含用户id 继续向下执行
	if(req.cookies.userId){
		next();
	}else{
		//console.log('req.originalUrl----:' + req.originalUrl)
        //如果等于以下接口则继续执行，否则的话直接拦截
		if(req.originalUrl == "/users/login" || req.originalUrl == "/users/logout" || req.originalUrl.indexOf("/goods/list") >-1){
			next();
		}else{
			res.json({
				status:"1",
				msg:"当前未登录",
				result:""
			})
		}
	}
})

app.use('/', indexRouter);//默认
app.use('/users', users);//用户
app.use('/goods',goods);//商品

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
