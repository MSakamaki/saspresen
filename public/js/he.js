
$(document).ready(function() {
if ("WebSocket" in window) {
	/* mobile event  */
	$("#btn_he").bind("vmousedown", function() {
		/*console.log("hedown");*/
		$("#btn_he").attr("src", "./img/heekop.png");
	});
	$("#btn_he").bind("vmouseup", function() {
		/*console.log("heup");*/
		$("#btn_he").attr("src", "./img/heeko.png");
	});

	/* get client ip*/
	var _ip ="";
	$(function () {
		$.getJSON("http://jsonip.appspot.com?callback=?", function (data) {
			_ip = String(data.ip);
		});
	});  

	/* websocket に接続する */
	var ws = new WebSocket("ws://lt.yamada3.org:8885/");
	ws.onerror = function(e){
		console.log("onerror");
	};
	/*
	ws.onopen = function(){
		ws.send(JSON.stringify({
			type : "open",
			ip   : _ip 
		}));
	};*/

	/* ボタン */
	$("#btn_he").bind("vclick", function() {
		console.log(_ip + " hello!");
		ws.send(JSON.stringify({
			type : "hepush",
			ip   : _ip
		}));
	});

	window.onbeforeunload = function () {
		ws.send(JSON.stringify({
		    type : "defect",
		    ip   : _ip,
		}));
	};
} else {
	 alert ("お使いのブラウザはwesocketに対応していません");
}
});
