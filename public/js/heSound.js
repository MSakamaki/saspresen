$(document).ready(function() {
	var _ip = 'host';
	var ws = new WebSocket('ws://lt.yamada3.org:8887/');
	var context;
	var bf;

	ws.onopen = function(){
		ws.onmessage = function (event) {
			var data = JSON.parse(event.data);
			if (data.type == 'view') {
				soundP();
			}
		};

		context = new webkitAudioContext();
		bf = new BufferLoader(context
			,['./sound/he.mp3']
			,function(){console.log("finish load.");});
		bf.load();
		soundP = function() {
			var buffer = bf.bufferList[0];
			var time = context.currentTime + 0.100; 
			var source = context.createBufferSource();
			source.buffer = buffer;
			source.loop = false;
			source.connect(context.destination);
			source.noteOn(time);
			return source;
		};
	};

	/* 30秒毎にハートビート送信 */
/*
	heartBeat = function() {
		console.log('ws' + ws);
		if(ws.readyState == 3){
			console.log('closed connection');
		} else if (ws.readyState == 1) {
			ws.send(JSON.stringify({ type : 'heartbeat', ip : _ip }));
			setTimeout("heartBeat()", 30000);
		}	
	}
	setTimeout("heartBeat()", 30000);
*/
});


