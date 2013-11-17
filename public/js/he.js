var hEvent = {
	ws : null,
    imgItem : undefined,
    imgSet : undefined,
	init : function(server, port) {
		$.get('conf/conf.json',function(data){
			ws = new WebSocket('ws://' + data[0].server + ':' + data[0].port + '/');
		});
        imgSet=[
            {img:'img/conoha.jpg',msg:'VPS is From now', msg2:' very fun!'},  // 0
            {img:'img/anzu.jpg',msg:'VPS is From now', msg2:' very fun!'},    // 1
            {img:'img/yoda.jpg',msg:'Don\'t think... feel...'},    // 2
            {img:'img/cloudia.jpg',msg:'Azure is cloud platform',msg2:'built for you.'}, // 3
            {img:'img/fox.png',msg:'firefoxOS for best of',msg2:' the mobile web'},     // 4
            {img:'img/grunt.png',msg:'I  JavaScript Task Runner'},   // 5
            {img:'img/wm.png',msg:'I am Web Matrix man !!'},      // 6
            {img:'img/yeoman-003.png',msg:'modern workflows for modern webapps!'}
        ];
        console.log(imgSet);
        var idx = Math.floor( Math.random() * imgSet.length);
        console.log(idx);
        imgItem = imgSet[ idx ];
        console.log(imgItem);
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
		yoImg.src=imgItem.img;
		var refresh = function(){
            //btn.width($(window).width());
            //btn.height($(window).height());

            console.log('wsize', $(window).width(), $(window).height());
            ctHee.fillStyle = "#FFFFFF";
            ctHee.fillRect(0,0,$(window).width(),$(window).height());
            //console.log('imgset', yoImg);

			ctHee.drawImage(yoImg
				// image size
                ,100,0,480,640
                // view side
                ,0,0,48*5,64*5
				//,0,10,(48 * 12),(32* 6)
                //,20,0,imgItem.h,imgItem.w
                //,(imgItem.w*imgItem.m),(imgItem.h*imgItem.m)
                //,yoImg.naturalWidth ,yoImg.naturalHeight /2
				//,0,0,yoImg.naturalHeight,yoImg.naturalWidth
				//,0,0,$(window).width() / 5 ,$(window).height() / 5
				);
		}
		var pushHe =function(){
            ctHee.fillStyle = "#000000";
			ctHee.font = "18px 'ＭＳ Ｐゴシック'";
			ctHee.fillText(imgItem.msg, 10, ($(window).width() / 25)+10 );
            if (imgItem.msg2){
                ctHee.fillText(imgItem.msg2, 10, ($(window).width() / 25) + 35);
            }
			setTimeout(refresh,1000);
		}
		yoImg.onload=refresh;
	}
};
