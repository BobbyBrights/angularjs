(function(){
    angular.module('angularSpa')
	.controller('misActividadesController', function($scope, $http, url, input, $location, $rootScope, $cookieStore){


		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.jumbotronTitle = "Mis Actividades";
		$scope.jumbotronBody = "Revisa el estado de todas las actividades en las que estás participando actualmente y visualiza los detalles de las actividades en las que ya participaste."
		
		$scope.btn_mis_actividades_selected = true;
		
		// Barra de navegación:
			$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');

		// Funciones para los botones:

			$scope.go = function ( path ) { $location.path(path); };

			$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

			$scope.configuraciones = function(){ $scope.go('configuraciones'); };

			$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };
		});

})();