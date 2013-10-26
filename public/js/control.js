function consoleCtrl($scope, $http, wsFact, wsGrph){
	$scope.section=0;
	$scope.graph=new TimeSeries();
	$scope.heCnt=0;
	wsFact.subscribe(function(msg){
		var data = JSON.parse(msg);
		console.log('subscribe ctrl fact:',msg, data);
		if(data.sect){$scope.section=data.sect;}
		if(data.type=='view'){
			$scope.heCnt=data.hCnt;
		}
		$scope.$apply();
	});
	wsGrph.subscribe(function(msg){
		var data = JSON.parse(msg);
		console.log('subscribe ctrl glap:',msg, data);
		if(data.data || data.data){
			$scope.grphData=data.data;
		}

		$scope.$apply();
	});
	$scope.connect=function(){
		$http.get('conf/conf.json').success(function(data){
			$scope.conf=data[0];
			console.log('scopeOpen', $scope.conf);
			wsFact.connect($scope.conf.server, $scope.conf.port);
			wsGrph.connect($scope.conf.server, $scope.conf.gport);
		});
	};
	angular.element(document).ready(function(){
	//$scope.mkchrt=function(){
		//console.log('mkchrt');
		//var random = new TimeSeries();
		//setInterval(function() {
		//	random.append(new Date().getTime(), Math.random() * 10000);
		//}, 500);
		setInterval(function() { 
			$scope.graph.append(new Date().getTime(), $scope.heCnt); 
		}, 1000);
		var chart = new SmoothieChart();
		chart.addTimeSeries($scope.graph, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 2 });
		chart.streamTo(document.getElementById("chrt"),1000);
	//};
	});

	var send = function(msg){
		wsFact.send(JSON.stringify({
			type:'console',
			ctrl:msg
		}));
	}
	console.log('next');
	$scope.next=function(){
		send('next');
	}
	$scope.prev=function(){
		send('prev');
	}
	$scope.reset=function(){
		send('reset');
	}
	$scope.endroll=function(){
		send('endroll');
	}
	$scope.he=function(){
		send('he');
	}
}

