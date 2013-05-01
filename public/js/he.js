
var hEvent = {
	ws : null,
	_ip : null,
	init : function() { 
		ws = new WebSocket('ws://lt.yamada3.org:8885/');
		$.getJSON("http://jsonip.appspot.com?callback=?", function (data) {
			_ip = String(data.ip);
		});
	},
	setMousEvent : function(btnId){
		var btn = $(btnId);
		btn.bind('vmousedown', function(){
			btn.attr("src", "./img/heekop.png");
		});
		btn.bind("vmouseup", function() {
			btn.attr("src", "./img/heeko.png");
		});
		btn.bind("vclick", function() {
			console.log('hepush');
			ws.send(JSON.stringify({
				type : "hepush",
				ip   : _ip
			}));
		});
	}
};

exports.test = hEvent;
