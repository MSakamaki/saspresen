$(document).ready(function() {

	var canvas;         // the canvas element
	var context;        // the 2d context of the canvas
	var stage;          // the createjs stage
	var emitter;        // the emitter
	var fpsLabel;       // label to show the current frames per second
	var particleImage;  // the image to use for each particle

    var iframesrcs={
        presen : "https://docs.google.com/presentation/d/15957TLKdDL9q0aPI-xSmrRNkCLXzVAIbU1FAMC6V3co/embed?start=false&loop=false&delayms=60000",
        //presen : 'https://docs.google.com/presentation/d/1Iu7t6hl9Zs4Lah7QsLhjMDCDX9ADumRr8DsuaYFWQzQ/embed?start=false&loop=false&delayms=3000',
        chart : "/chart",
        endroll : "/endroll"
    };

	var _ip = 'host';
	var ws;
	$.get('conf/conf.json',function(data){
		ws = new WebSocket('ws://' + data[0].server + ':' + data[0].port + '/');
		ws.onmessage = function (event) {
			var data = JSON.parse(event.data);
            console.log(data);
			if (data.type == 'view') {
				var base = document.getElementById('lblA');
				base.innerHTML = data.hCnt;
				//addParticleEmitter(canvas.width / 2, canvas.height * 3 / 4);

				ctHee.drawImage(hesImg, 0, 0);

	          	ctHee.fillStyle = "#000000";
				ctHee.font = "20px 'ＭＳ Ｐゴシック'";
				var xh = Math.floor( Math.random() * 30) +  5,
					xy = Math.floor( Math.random() * 30) + 15;
				ctHee.fillText("へぇ～", xh, xy );

				setTimeout(hemoto, 500);
			} else if(data.type=='ctrl'){
                console.log('before',$('#viewFrame').attr('src'));
                switch(data.mode){
                    case 'presen':
                        console.log('mode presen',data.mode, iframesrcs.presen);
                        $('#viewFrame').attr('src',iframesrcs.presen);
                        break;
                    case 'chart':
                        console.log('mode chart',data.mode, iframesrcs.chart);
                        $('#viewFrame').attr('src',iframesrcs.chart);
                        break;
                    case 'endroll':
                        console.log('mode endroll',data.mode, iframesrcs.endroll);
                        $('#viewFrame').attr('src',iframesrcs.endroll);
                        break;
                    default:
                        $('#viewFrame').attr('src',iframesrcs.presen);
                        break;
                }
                console.log('after',$('#viewFrame').attr('src'));
            }
		};

		$("#btnReset").bind("click", function() {
			ws.send(JSON.stringify({
				type : 'resetCnt',
				ip   : _ip 
			}));
		});

		/* init */
		ws.onopen = function () {
			ws.send(JSON.stringify({
				type : 'plessenAccess',
				ip   : _ip
			}));
		}

		heartBeat = function() {
			console.log('ws' + ws);
			if(ws.readyState == 3){
				console.log('closed connection');
			} else if (ws.readyState == 1) {
				console.log('push heartbeat');
				ws.send(JSON.stringify({ type : 'heartbeat', ip : _ip }));
				setTimeout("heartBeat()", 10000);
			}	
		}
		/* 10秒毎にハートビート送信 */
		setTimeout("heartBeat()", 10000);
	});
	/*へぇ子描画*/
	var cHee = document.getElementById('heeko');
	var ctHee = cHee.getContext('2d');
	var heeImg = new Image();
	var hesImg = new Image();
	heeImg.src = 'img/heekop.png';
	hesImg.src = 'img/heeos.png';
	heeImg.onload = function() {
		ctHee.drawImage(heeImg, 0, 0);
	}
	/* もとに戻す */
	var hemoto = function(){
		ctHee.clearRect(0, 0, canvas.width, canvas.height);
		ctHee.drawImage(heeImg, 0, 0);
	}

	/* パーティクル処理 */
	particleImage = new Image();
	particleImage.onload = initCanvas;
	particleImage.src = "js/libs/particle_base.png";

	function initCanvas() {
		canvas = document.getElementById('particleEmitterCanvas');
		context = canvas.getContext("2d");
		//context.globalAlpha = 0.5;
		stage = new createjs.Stage(canvas);

		createjs.Ticker.setFPS(30);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.addListener(update);

		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(stage);
		}
		/* addParticleEmitter(canvas.width / 2, canvas.height * 3 / 4); */
	}

	function addParticleEmitter(x, y) {
		emitter = new createjs.ParticleEmitter(particleImage);
		emitter.emitterType = createjs.ParticleEmitterType.OneShot; /* １回こっきり */
		emitter.position = new createjs.Point(x, y);
		emitter.emissionRate = 70;
		emitter.maxParticles = 8;
		emitter.life = 1000;
		emitter.lifeVar = 0;
		emitter.speed = 200;
		emitter.speedVar = 0;
		emitter.positionVarX = 0;
		emitter.positionVarY = 0;
		emitter.accelerationX = 0;
		emitter.accelerationY = 0;
		emitter.radialAcceleration = 0;
		emitter.radialAccelerationVar = 0;
		emitter.tangentalAcceleration = 0;
		emitter.tangentalAccelerationVar = 0;
		emitter.angle = 270;
		emitter.angleVar = 90;
		emitter.startSpin = 0;
		emitter.startSpinVar = 0;
		emitter.endSpin = null;
		emitter.endSpinVar = null;
		emitter.startColor = [255, 0, 255];
		emitter.startColorVar = [0, 0, 0];
		emitter.startOpacity = 1;
		emitter.endColor = [255, 255, 255];
		emitter.endColorVar = null;
		emitter.endOpacity = null;
		emitter.startSize = 20;
		emitter.startSizeVar = 0;
		emitter.endSize = 0;
		emitter.endSizeVar = null;
		stage.addChild(emitter);
	}

	function update() {
		stage.update();
	}
	/*
	$("#btnP").bind("click", function(){
		addParticleEmitter(canvas.width / 2, canvas.height * 3 / 4);
	});*/
});
