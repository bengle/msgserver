
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'), fav = require('./routes/faverate')
  , http = require('http')
	, sendMsg = require('./sendmsg');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/login', function(req, res){
  res.render('login', {});
});

app.get('/auth', function(req, res){
  res.render('msg', {});
});

app.get('/fav', function(req, res){
  fav.fav(req, res);
});

app.get('/msg', function(req, res){
    res.render('msg', {});
});

app.get('/list', function(req, res){
    res.render('list', {});
});

app.get('/setting', function(req, res){
    res.render('setting', {});
});

app.get('/send',function(req, res){
	res.render('send',{});
});

app.get('/newmsg',function(req, res){
	sendMsg.sendMsg();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
