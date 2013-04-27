

exports.he = function(req, res){
 //res.render('index', { title: 'Express' });
 res.render('lt/he', { title: 'へぇボタン画面' });
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

