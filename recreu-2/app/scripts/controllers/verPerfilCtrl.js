(function(){
    angular.module('angularSpa')
.controller('verPerfilCtrl', function($scope, $http, url, input, $rootScope, $location, $routeParams,  $cookieStore, $route){

	// Elementos de la vista:
		
		// Background:
		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		// Jumbotron:
		$scope.jumbotronTitle = "Perfil de Usuario "
		$scope.jumbotronBody = "";

		// Barra de navegación:
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');
		$scope.esAdmin= $cookieStore.get('esAdministrador');

		
		// Variables relevantes:
		var perfilId = $routeParams.perfilId;
		var usuarioId_actual = $cookieStore.get('usuarioId');

		//usuario visitado
		$scope.perfil = {};

	// Funciones para los botones:

		$scope.go = function ( path ) { $location.path(path); };

		$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

		$scope.configuraciones = function(){ $scope.go('configuraciones'); };

		$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };
		
		$scope.volver = function(){ $scope.go('explora'); }		

	// Datos de la actividad:



		// Formateo de la fecha de inicio de la actividad:
		$scope.formatearFechaInicio = function(date){ return input.formatearFechaInicio(date);}

		// Formateo de la duración estimada de la actividad:
		$scope.formatearDuracionEstimada = function(duracionEstimada){ return input.formatearDuracionEstimada(duracionEstimada);}




	function obtenerPerfilUsuario()
	{
		input.servicioObtenerUsuarioId(perfilId).success(function(data,status){
		$scope.perfil= data;
			});

	}


	obtenerPerfilUsuario();





});
})();
