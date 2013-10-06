

exports.he = function(req, res){
 res.render('lt/he', { 
 	title: 'へぇボタン画面',
	server : 'localhost',
	port : 8887
	});
};

exports.console = function(req, res){
 res.render('lt/console');
};

exports.presen = function(req, res){
	res.render('lt/presen', { 
		server : 'localhost',
		port : 8887
	});
};

exports.hesound  = function(req, res){
    res.render('lt/hesound');
};

exports.hesoundmobile = function(req, res){
    res.render('lt/hesoundmobile');
};

exports.endroll = function(req, res){
    res.render('lt/endroll');
};
