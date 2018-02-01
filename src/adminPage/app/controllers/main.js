app.controller('mainController', function($scope, $route, $http, authService, FileSaver, Blob) {
	$scope.auth = authService;

	$scope.isActive = function(tab) {
		if (!$route.current) {
			return false;
		}
		return $route.current.activetab == tab;
	};
	
	$scope.api = "http://localhost:8080";
	$scope.apiGet = function(path) {
		return $http.get($scope.api + path, {
			headers: {
				'X-Auth-Token': $scope.auth.token
		}
		}).then(null, function(response) {
			$scope.auth.logout($scope.api);
		});
	};
	$scope.apiCall = function(method, path, params, data, callback) {
		$http({
			method: method,
			url: $scope.api + path,
			params: params,
			data: data,
			headers: {
				'X-Auth-Token': $scope.auth.token
			}
		}).then(function(response) {
			if (callback) {
				callback(response);
			}
			// TODO DEBUG CODE remove this line
			alert(JSON.stringify(response));
			$route.reload();
		}, function(response) {
			$scope.auth.logout($scope.api);
		});
	};
	$scope.apiPost = function(path, data, callback) {
		$scope.apiCall('POST', path, data, null, callback);
	};
	$scope.apiPatch = function(path, data, callback) {
		$scope.apiCall('PATCH', path, data, null, callback);
	};
	$scope.apiDelete = function(path, callback) {
		$scope.apiCall('DELETE', path, null, null, callback);
	};

	$scope.downloadDB = function() {
		$scope.apiGet('/backup').then(function(response) {
			console.log(response);
			FileSaver.saveAs(new Blob([response.data], {
				type: 'text/plain;charset=utf-8'
			}), 'dump-' + Date.now() + '.sql');
		});
	}
});