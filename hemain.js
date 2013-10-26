
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , lt    = require('./routes/lt')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
;

var serverInfo ={
	ip : 'localhost',
	port : '80'
};

/* websocket関係 
var secCnt=0;
var heCount=0;*/
var section=0;
var cnt={
	he : 0,
	sect : 0
};


var ws = require('websocket.io');
var server = ws.listen(8887, function() {
	console.log('he server start ');
});
var grf= ws.listen(8886, function() {
	console.log('he server grf start ');
});

server.on('connection', function(socket) {
	socket.on('message', function(data) {
		console.log('getMsg:' + data);	
		var data = JSON.parse(data);
		if (data.type == 'hepush'){
			cntUp();// 評価カウントアップ
			server.clients.forEach(function(client) {
				if ( client ) {
					try{
						client.send(JSON.stringify({ type : 'view', hCnt : cnt.he }));
					}catch(e){
						console.log('err:' + e);
					}
				}});
			try {
				grf.clients.forEach(function(client){
					getGdata(function(_data){
						client.send(JSON.stringify({type:'graph', data:_data }));
					});
					
					//client.send(JSON.stringify({type:'graph', data: getGdata()}));
				});
			} catch(e){console.log(e)}
		} else if (data.type == 'console'){
			/* console mode */
			var dtt=data.ctrl;
			switch(data.ctrl){
				case 'next':
				case 'prev':
					data.ctrl=='next'?section++:section--;
					cnt.sect=0;
					server.clients.forEach(function(client) {
						if ( client ) {
							try{
								client.send(JSON.stringify({ type : 'controller', sect : section }));
							}catch(e){
								console.log('err:' + e);
							}
						}
					});
					break;
				case 'reset':
					cnt.he=0;
					cnt.sect=0;
					break;
				case 'he':
					cntUp();
					break;
				case 'endroll':
					console.log('TODO mizissou');
					break;
				default:
					break;
			}
		}
	});
});
var cntUp=function(){
	cnt.sect++;
	cnt.he++;
	heUpd(section, cnt.sect);
};

grf.on('connection', function(socket) {
	socket.on('message', function(data) {
		console.log('getMsg:' + data);	
	});
});

/*　ここからサーバー */
var app = express();

app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

app.get('/', routes.index);
app.get('/he', lt.he);
app.get('/presen',lt.presen);
app.get('/heSound',lt.hesound);
app.get('/hesoundmobile',lt.hesoundmobile);
app.get('/endroll', lt.endroll);
app.get('/console', lt.console);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/* DB制御 
mongodb はatmicな操作を保証したりしないので
pointの保持はコンソール側のアクションで
*/
var db = mongoose.connect('mongodb://localhost/hedb');
var heschema = new mongoose.Schema({ sect  : Number, point : Number });
var model = db.model('heDB', heschema);

var heUpd = function(_sect, _point){
	fncSect(_sect, function(){
		//console.log('update',_sect,_point);
		//var mdl = new model();
		model.update(
			{sect:_sect},
			{$inc : {point : _point }},
			{ upsert : false , multi : false},
			function(err){ 
				if(err){ console.log('heUpd err:',err);}
			}
		);
	}, function() {
		//console.log('insert', _sect, _point);
		var mdl = new model();
		mdl.sect=_sect;
		mdl.point=_point;
		mdl.save(function(err){ if(err){ console.log('err', err);} });
	});
}
var fncSect = function(_sect, updfnc, insfnc){
	model.find({sect:_sect}, function(err,item){
		if(err || item===null){return;}
		//console.log('isSect : ',item);
		if(item.length){
			updfnc();
		}else{
			insfnc();
		}
		//shows();
	});
}
var shows = function(){
	model.find({}, function(err, item){
		item.forEach(function(lst){
			console.log('SECTION:',lst.sect, 'POINT:', lst.point, 'JSON:', lst);
		});
	});
}
var getGdata=function(fnc){
	model.find({}, function(err, item){
		fnc(item);
	});
}
