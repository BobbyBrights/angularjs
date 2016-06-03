(function(){
    angular.module('angularSpa')
    .controller('reportesCtrl', function($scope, $http, url, input, $location, $rootScope, $routeParams, $cookieStore){
        
      
      	
	//	$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
	//	$rootScope.backgroundSize = "cover";

/*
		$scope.jumbotronTitle = "¡Bienvenido a RecreU!"
		$scope.jumbotronBody = "La aplicación tanto web como movil que permite a sus usuarios orgarnizar y/o paticipar en actividades recreativas de cualquier índole dentro de los limites de nuestra universidad. Expande tus fronteras, forma nuevas amistades y convierte tu vida universitaria en una experiencia más amena.";
		$scope.btn_explore_selected = true;*

*/

		// Datos del usuario 
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');

		$scope.go = function ( path ) {
			console.log(path);
			$location.path(path);
			console.log("cambio?") 
		};

		$scope.nueva_actividad = function(){
			console.log(">> Nueva actividad");
			$scope.go('actividad/crear');
		};

		$scope.configuraciones = function(){
			console.log(">> Configuraciones");
			$scope.go('configuraciones');
		};

		$scope.salir = function (){
			console.log(">> Desloguear actual sesión de usuario");
			sesionUsuarioCtlr.cerrarSesion();
		};

		// Busqueda:
		$scope.parametros_busqueda = "";
		$scope.busqueda = function(){
			console.log("Busqueda sin implementar");
			console.log("\tParametros: "+$scope.parametros_busqueda);
		}

		$scope.reportes = []

		input.servicioObtenerReportes().success(function(data,status){

				console.log(data);
				$scope.reportes = data;
					

				}).error(function(error,status)
				{
					console.log(error);

		});



		$scope.usuarios =  {}

		input.servicioObtenerUsuarios().success(function(data)
			{
				
				$scope.usuarios = data ;

			}).error(function(error,status)
				{

				});


		$scope.idUsElim = 0;
		$scope.eliminarUsuario = function(id){


			input.servicioEliminarUsuario(id);
			input.servicioObtenerUsuarios().success(function(data)
			{

		
				$scope.usuarios = data ;
				$scope.go('reportes');

			}).error(function(error,status)
				{
				});

			}



		// Categorias:
		
        ;
    });
})();
