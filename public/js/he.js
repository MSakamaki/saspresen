var hEvent = {
	ws : null,
	init : function() { 
		ws = new WebSocket('ws://lt.yamada3.org:8887/');
	},
	setMousEvent : function(btnId){
		var btn = $(btnId);
		btn.bind('vmousedown', function(){
			btn.attr("src", "./img/heekop.png");
		});
		btn.bind("vmouseup", function() {
			btn.attr("src", "./img/heeko.png");
		});
		btn.bind("vclick", function(e) {
			//console.log('hepush');
			/* 左上辺が０、右下辺が１ */
			var _clickX = ((e.clientX - this.offsetLeft) / this.width);
			var _clickY = ((e.clientY - this.offsetTop) / this.height);
			console.log('X:' + _clickX + ' Y:' + _clickY);
			ws.send(JSON.stringify({
				type : "hepush",
				clickX : _clickX,
				clickY : _clickY
			}));
		});
	}
};
