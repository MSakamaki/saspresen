
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , lt    = require('./routes/lt')
  , http = require('http')
  , path = require('path')
;

/* websocket関係 */
var heCount= 0;
var ws = require('websocket.io');
var server = ws.listen(8887, function() {
	console.log('he server start ');
});

server.on('connection', function(socket) {
	socket.on('message', function(data) {
		console.log('getMsg:' + data);	
		var data = JSON.parse(data);
		if (data.type == 'hepush'){
			heCount++;
			server.clients.forEach(function(client) {
				if ( client != null) {
					client.send(JSON.stringify({ type : 'view', hCnt : heCount }));
				}});
		} else if (data.type == 'resetCnt') {
			heCount=0;
		}
	});});

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

