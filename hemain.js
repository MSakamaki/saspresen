
var express = require('express')
  , routes = require('./routes')
  , restify = require('restify')
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
/*
var grf= ws.listen(8886, function() {
	console.log('he server grf start ');
});*/

server.on('connection', function(socket) {
	socket.on('message', function(data) {
		console.log('getMsg:' + data);	
		var data = JSON.parse(data);
		if (data.type == 'hepush'){
			cntUp();// 評価カウントアップ

            allClientSends({ type : 'view', hCnt : cnt.he });
//            server.clients.forEach(function(client) {
//				if ( client ) {
//					try{
//						client.send(JSON.stringify({ type : 'view', hCnt : cnt.he }));
//					}catch(e){
//						console.log('err:' + e);
//					}
//				}});
		} else if (data.type == 'console'){
			/* console mode */
            consoleAction(data);
		}
	});
});

var consoleAction = function(data){
    switch(data.ctrl){
        case 'next':
        case 'prev':
            data.ctrl=='next'?section++:section--;
            cnt.sect=0;
            /*
            clientAction(server.client)
            server.clients.forEach(function(client) {
                if ( client ) {
                    try{
                        client.send(JSON.stringify({ type : 'controller', sect : section }));
                    }catch(e){
                        console.log('err:' + e);
                    }
                }
            });*/
            allClientSends({ type : 'controller', sect : section });
            break;
        case 'reset':
            cnt.he=0;
            cnt.sect=0;
            deleteAllGdata();
            break;
        case 'he':
            cntUp();
            break;
        case 'presen':
            allClientSends({ type : 'ctrl', mode : 'presen' });
            break;
        case 'endroll':
            allClientSends({ type : 'ctrl', mode : 'endroll' });
            break;
        case 'chart':
            allClientSends({ type : 'ctrl', mode : 'chart' });
        default:
            break;
    }
}

var cntUp=function(){
	cnt.sect++;
	cnt.he++;
	heUpd(section, cnt.sect);
};

var allClientSends= function(sendData){
    server.clients.forEach(function(client) {
        if ( client ) {
            try{
                client.send(JSON.stringify(sendData));
            }catch(e){
                console.log('err:' + e);
            }
        }
    });
}

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
app.get('/chart', lt.chart);

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
var deleteAllGdata=function(){
    model.remove({}, function(err){
        console.log('err:', err);
    });
}

/* REST module*/
var restServer = restify.createServer();
restServer.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

restServer.get('/g', function(req, res, next){
    getGdata(function(_data){
        var data =[];
        _data.forEach(function(item){
            if (item.sect){
                data.push(JSON.stringify({ point :item.point, sect : item.sect }));
            }
        });
        //console.log('data:',data);
        res.send(data);
        //res.send(JSON.stringify({type:'graph', data:data }));
    });
});

restServer.listen(8886, function() {
    console.log('listening at ', restServer.name, restServer.url);
});