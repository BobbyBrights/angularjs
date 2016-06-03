(function(){
    angular.module('angularSpa')
	.controller('mainController',
		function( $scope, $location, $rootScope){

		console.log("Accediendo a la vista main");
		$rootScope.backgroundData = "url('/images/bg_v2.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.go = function ( path ) {
			console.log(path);
			$location.path(path); 
		};


	})

})();
