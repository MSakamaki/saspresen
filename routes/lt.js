

exports.he = function(req, res){
 res.render('lt/he', { 
 	title: 'へぇボタン画面'
	});
};

exports.console = function(req, res){
 res.render('lt/console');
};

exports.presen = function(req, res){
	res.render('lt/presen');
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

exports.console=function(req, res){
	res.render('lt/console');
}
