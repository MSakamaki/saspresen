var hEvent = {
	ws : null,
	init : function(server, port) {
		ws = new WebSocket('ws://' + server + ':' + port + '/');
},
	setMousEvent : function(btnId){
		var btn = $(btnId);
		btn.bind('vmousedown', function(){
			//btn.attr("src", "./img/heekop.png");
			pushHe();
		});
		//btn.bind("vmouseup", function() {
			//btn.attr("src", "./img/heeko.png");
		//});
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
		ctHee = btn[0].getContext('2d');
		//btn.width($(window).width());
		//btn.height($(window).height());
		var yoImg = new Image();
		yoImg.src='img/yoda.jpg';
		var refresh = function(){
			ctHee.drawImage(yoImg
				,0,0,yoImg.naturalWidth / 2,yoImg.naturalHeight / 2
				//,0,0,yoImg.naturalHeight,yoImg.naturalWidth
				//,0,0,$(window).width() / 5 ,$(window).height() / 5
				);
				btn.width($(window).width());
				btn.height($(window).height());
		}
		var pushHe =function(){
			ctHee.fillText('フォースじゃ・・・', 10, ($(window).width() / 15));
			setTimeout(refresh,1000);
		}
		yoImg.onload=refresh;
	}
};
