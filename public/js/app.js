angular.module('WebSocketFactory', [])
	.factory('wsFact', function(){
		var service = {};
		console.log('angular ws ');
		service.connect = function(server, port){
			console.log('wsFact.connect');
			if (service.ws){return;}
			var ws = new WebSocket('ws://'+server+':'+port+'/');
			ws.onopen=function(){
				service.callback(JSON.stringify({ msg : 'open connection'}));
			}
			ws.onerror=function(){
				service.callback(JSON.stringify({ msg : 'ws error'}));
			}
			ws.onmessage=function(msg){
				service.callback(msg.data);
			}
			service.ws=ws;
		};
		service.send = function(msg){
			service.ws.send(msg);
		};
		service.subscribe = function(callback){
			service.callback=callback;
		};
		return service;
	})
	.factory('wsGrph', function(){
		var service = {};
		console.log('Grph ws ');
		service.connect = function(server, port){
			console.log('wsGrph.connect');
			if (service.ws){return;}
			var ws = new WebSocket('ws://'+server+':'+port+'/');
			ws.onopen=function(){
				service.callback(JSON.stringify({ msg : 'open connection'}));
			}
			ws.onerror=function(){
				service.callback(JSON.stringify({ msg : 'ws error'}));
			}
			ws.onmessage=function(msg){
				service.callback(msg.data);
			}
			service.ws=ws;
		};
		service.send = function(msg){
			service.ws.send(msg);
		};
		service.subscribe = function(callback){
			service.callback=callback;
		};
		return service;
	});
/*
angular.element(document).ready(function(){
		console.log('load!', document.getElementById('chrt'));
		var random = new TimeSeries();
		setInterval(function() {
			random.append(new Date().getTime(), Math.random() * 10000);
		}, 500);

		console.log('createTimeLine', document.getElementById('chrt'));
		var chart = new SmoothieChart();
		chart.addTimeSeries(random, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
		chart.streamTo(document.getElementById("chrt"), 500);
});*/

