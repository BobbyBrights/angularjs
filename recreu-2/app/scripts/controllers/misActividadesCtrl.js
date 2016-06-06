(function(){
    angular.module('angularSpa')
	.controller('misActividadesController', function($scope, $http, url, input, $location, $rootScope, $routeParams, $cookieStore){

		$scope.asa = $cookieStore.get('usuarioId');

		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.jumbotronTitle = "Mis Actividades";
		$scope.jumbotronBody = "Revisa el estado de todas las actividades en las que estás participando actualmente y visualiza los detalles de las actividades en las que ya participaste."
		
		$scope.btn_mis_actividades_selected = true;


		
		// Barra de navegación:
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');
		$scope.esAdmin= $cookieStore.get('esAdministrador');

		// Funciones para los botones:

			$scope.go = function ( path ) { $location.path(path); };

			$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

			$scope.configuraciones = function(){ $scope.go('configuraciones'); };

			$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };


			$scope.verActividad = function(id){$scope.go("/actividad/id=" + id); }

			$scope.mostrarTodos = function(){ $scope.go("/explora");}

			$scope.reportes = function(){ $scope.go("/reportes");}





	//Actividades:
		$scope.actividades;
		$scope.limite_rows_actividades = 1;
		$scope.obtenerActividades = function(){
			input.servicioObtenerActividadesUsuarioId($cookieStore.get('usuarioId')).
			then(function(response){
				$scope.actividades = response.data;
				

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



		$scope.obtenerActividadesOrganizador = function(){

			//el web service aun no tiene implementado el obetener actividades que organizo un usuario y solo devuelve un json con el organizador , asi que
			//por mientras se hace a la mala , en caso se implementarse descomentar el la linea de abajo y boorrar todo lo otro

			//input.servicioObtenerActividadesOrganizadorId($cookieStore.get('usuarioId')).


			input.servicioObtenerActividadesUsuarioId($cookieStore.get('usuarioId')).
			//input.servicioObtenerActividadesOrganizadorId($cookieStore.get('usuarioId')).


			then(function(response){

				//$scope.actividades = response.data; (descomentar en caso de implementar el webservise)

				var todasActividades = response.data; //eliminar en caso de implementar el webservice
				$scope.actividades = []; //eliminar en caso de implementar el webservice


				var j = 0;
				//eliminar todo el for en caso de implementar el webservice
				for(var i = 0  ; i < todasActividades.length; i++)
				{

					console.log("AGGGGG TAMAREEEEE");
					console.log(todasActividades[i].organizador.usuarioId);
					console.log("v/s");
					console.log($cookieStore.get('usuarioId'));

					if(todasActividades[i].organizador.usuarioId==$cookieStore.get('usuarioId'))
					{
						
						console.log("entra");

						// NO USAR PUSHH , POR ALGUNA RAZON DESCONOCIDA EXPLOTAAAAA XD
						$scope.actividades[j] = todasActividades[i];
						j++;

					}
					
				}



				console.log($scope.actividades);
				console.log("sigue?");
									

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
				//$scope.$apply();

			});
		}


		$scope.obtenerActividadesPendientes = function(){

			//$scope.go("/explora/mis_actividades/organizador");

			input.servicioObtenerActividadesUsuarioId($cookieStore.get('usuarioId')).


			then(function(response){
				//$scope.actividades = response.data;
				var todasActividades= response.data
				$scope.actividades = [];

				var j = 0;

				for(var i = 0; i < todasActividades.length; i++)
				{
					if(todasActividades[i].esActivo)
					{
						// NO USAR PUSHH , POR ALGUNA RAZON DESCONOCIDA EXPLOTAAAAA XD
						console.log('actividades sin filtrar')
						console.log(todasActividades[i])
						$scope.actividades[j] = todasActividades[i];
						j++;

					}
					
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
				console.log("Actividades filtradas por atributo esActivo :", $scope.actividades);
				console.log("Row de actividades:", $scope.indice_row_actividades);


			});
		}




		$scope.obtenerActividades();

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


//agre























		});

})();