(function(){
    angular.module('angularSpa')
	.controller('misNotificacionesController', function($scope, $http, url, input, $location, $rootScope){


		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.jumbotronTitle = "Mis Notificaciones";
		$scope.jumbotronBody = "¿Has declarado ya tus actividades de interes? Pues entonces mira las recomendaciones que la aplicación tiene para ti."
		
		$scope.btn_notificaciones_selected = true;
		
		// Datos del usuario 
		$scope.nombre_usuario = "Nombre por defecto";


		$scope.go = function ( path ) {
			console.log(path);
			$location.path(path); 
		}

		$scope.nueva_actividad = function(){
			console.log(">> Nueva actividad");
			$scope.go('actividad/crear');
		}

		$scope.configuraciones = function(){
			console.log(">> Configuraciones");
			$scope.go('configuraciones');
		}

		$scope.salir = function (){
			console.log(">> Desloguear actual sesión de usuario");
			$scope.go('');
		}


	});

})();