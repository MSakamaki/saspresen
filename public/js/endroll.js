var dogBarkingBuffer = null;
console.log('reload');
function init(){
	try {
		context = new webkitAudioContext();
	}catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
	
	loadDogSound('sound/sw.mp3');
};

function loadDogSound(url) {
	console.log('rul' + url);
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		try{
			console.log('request.onload',context.decodeAudioData);
			//console.log(request.response);
			context.decodeAudioData(request.response
				, function(buffer) {
				var source = context.createBufferSource(); // creates a sound source
				source.buffer = buffer;                    // tell the source which sound to play
				source.connect(context.destination);       // connect the source to the context's destination (the speakers)
				source.noteOn(0);                          // play the source now
				console.log('start sound');
			},
			function(e){
				console.log(e);
			});
		}catch(e){
			console.log(e);
		}
	}
	request.send();
}

//var context = new webkitAudioContext();
/*
function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);                          // play the source now
}
*/





