(function(){
    angular.module('angularSpa')
	.controller('exploracionController', function($scope, $http, url, input, $location, $rootScope, $routeParams, $cookieStore){


	// Elementos de la vista:

		// Background:
		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		// Jumbotron:
		$scope.jumbotronTitle = "¡Bienvenido a RecreU!"
		$scope.jumbotronBody = "La aplicación tanto web como movil que permite a sus usuarios orgarnizar y/o paticipar en actividades recreativas de cualquier índole dentro de los limites de nuestra universidad. Expande tus fronteras, forma nuevas amistades y convierte tu vida universitaria en una experiencia más amena.";
		
		// Botones principales:
		$scope.btn_explore_selected = true;
		$scope.categoria_seleccionada = $routeParams.nombreCategoria;
	

		// Barra de navegación:
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');


	// Funciones para los botones:

		$scope.go = function ( path ) { $location.path(path); };

		$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

		$scope.configuraciones = function(){ $scope.go('configuraciones'); };

		$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };

		$scope.verActividad = function(id){$scope.go("/actividad/id=" + id); }

		$scope.mostrarTodos = function(){ $scope.go("/explora");}

		$scope.cambiarCategoria = function(categoria){$scope.go("/explora/categoria="+categoria);}

	// Busqueda:
		$scope.parametros_busqueda = "";
		$scope.busqueda = function(){
			console.log("Busqueda sin implementar");
			console.log("\tParametros: "+$scope.parametros_busqueda);
		}

	// Categorias:
		$scope.categorias;
		function obtenerCategorias(){
			input.servicioObtenerCategorias()
			.then(function(response){
				$scope.categorias = response.data;
			});
		}
		obtenerCategorias();

	//Actividades:
		$scope.actividades;
		$scope.limite_rows_actividades = 1;
		function obtenerActividades(){
			input.servicioObtenerActividades().
			then(function(response){
				$scope.actividades = response.data;
				
				// Filtro a la mala (Arreglar en el futuro):
				if ((typeof $routeParams.nombreCategoria) != "undefined"){
					var filtro_actividades = [];
					for (var i = 0; i < $scope.actividades.length; i++){
						if($scope.actividades[i].tipo.categoria.nombreCategoria == $routeParams.nombreCategoria){
							filtro_actividades.push($scope.actividades[i]);
						}
					}
					$scope.actividades = filtro_actividades;
				}

				$scope.indice_row_actividades = [];
				for (var i = 0; i < $scope.actividades.length; i++) {
				   	
				   switch((i+1)%3){
				   	case 0: 
				   		$scope.actividades[i].placement = "bottom";
				   		break;

				   	case 1:
				   		$scope.actividades[i].placement = "bottom";
			    		$scope.indice_row_actividades.push(i);
			    		break;

			    	case 2:
			    		$scope.actividades[i].placement = "bottom";
			    		break;

				   }
				}
				console.log("Actividades:", $scope.actividades);
				console.log("Row de actividades:", $scope.indice_row_actividades);
			});
		}
		obtenerActividades();

		$scope.funcion = function(date){
			var newdate = new Date(date);
			var actualdate = new Date();
			var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

			var diffDays = Math.round((newdate.getTime() - actualdate.getTime())/(oneDay));

			var retorno = "undefined"
			if (diffDays == 0){
				retorno = "Hoy a las " + newdate.getHours().toString() + ":" + (newdate.getMinutes()).toString() + " hrs";
			}
			else if(diffDays == 1){
				retorno = "Mañana a las " + newdate.getHours().toString() + ":" +  (newdate.getMinutes()).toString() + " hrs";
			}
			else if(diffDays < 2){
				retorno = "Pasado mañana a las " + newdate.getHours().toString() + ":" +  (newdate.getMinutes()).toString();
			}
			else{
				retorno = "En " + diffDays + " días más";

			}
			return retorno;
		}

		// Formateo del popover de la actividad
		$scope.formatear_popover = function (actividad){
			return  input.formatear_popOver(actividad);
		}

		// Formateo de la duración estimada de la actividad
		function convertirDuracionEstimada(duracionEstimada){
			return input.formatearDuracionEstimada(duracionEstimada);
		}

	})

        

})();