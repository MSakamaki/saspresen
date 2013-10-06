var _host = 'localhost',
	_port = 8887;


exports.he = function(req, res){
 res.render('lt/he', { 
 	title: 'へぇボタン画面',
	server : _host,
	port : _port
	});
};

exports.console = function(req, res){
 res.render('lt/console');
};

exports.presen = function(req, res){
	res.render('lt/presen', { 
		server : _host,
		port : _port
	});
};

exports.hesound  = function(req, res){
    res.render('lt/hesound');
};

exports.hesoundmobile = function(req, res){
    res.render('lt/hesoundmobile');
};

exports.endroll = function(req, res){
    res.render('lt/endroll', {
		server : _host,
		port : _port
	});
};
