
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes/index')
    , api = require('./routes/api')
    , http = require('http')
		, dataMod = require('./module/data-mod')
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

//dataMod.initdb('localhost',27017,'','','user');
dataMod.initdb('10.249.196.128',27017,'','','user');
//dataMod.findItems('xj032085');

app.get('/', routes.index);

app.post('/auth', function(req, res){
  var user = req.body.TPL_username;
  var psw = req.body.TPL_password;
  dataMod.findItems(user,function(result){
    console.log(result);
    if(result && result[0].password == psw){
        req.session.isLogin = true;
        res.setHeader('Content-type', 'text/json');
        res.send(JSON.stringify({isLogin:true}));
        //res.render('index', {username:user});
    }else{
        res.setHeader('Content-type', 'text/json');
        res.send(JSON.stringify({isLogin:false}));
        //res.render('login', {error:'密码错误'});
    }
  });
});

app.post('/logout', function(req, res){
    req.session.isLogin = false;
    res.setHeader('Content-type', 'text/json');
    res.send({result:true});
});


app.get('/send',function(req, res){
	res.render('send',{});
});

app.get('/newmsg',function(req, res){
	sendMsg.sendMsg();
});

//api
app.get('/api/:api?', api.route);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
