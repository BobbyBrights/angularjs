(function(){
    angular.module('angularSpa')
.controller('verActividadController', function($scope, $http, url, input, $rootScope, $location, $routeParams,  $cookieStore, $route){

	// Elementos de la vista:
		
		// Background:
		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		// Jumbotron:
		$scope.jumbotronTitle = "¡Bienvenido a RecreU!"
		$scope.jumbotronBody = "La aplicación tanto web como movil que permite a sus usuarios orgarnizar y/o paticipar en actividades recreativas de cualquier índole dentro de los limites de nuestra universidad. Expande tus fronteras, forma nuevas amistades y convierte tu vida universitaria en una experiencia más amena.";

		// Barra de navegación:
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');
		$scope.esAdmin= $cookieStore.get('esAdministrador');

		
		// Variables relevantes:
		var actividadId = $routeParams.actividadId;
		var usuarioId_actual = $cookieStore.get('usuarioId');

	// Funciones para los botones:

		$scope.go = function ( path ) { $location.path(path); };

		$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

		$scope.configuraciones = function(){ $scope.go('configuraciones'); };

		$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };
		
		$scope.volver = function(){ $scope.go('explora'); }		

		$scope.verPerfil = function(perfilId){$scope.go("/verPerfil/perfil=" + perfilId); }

	// Datos de la actividad:

		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		function obtenerActividad(){
			input.servicioObtenerActividadPorID(actividadId).
			then(function(response){
				console.log("Actividad:", response.data);
				$scope.actividad = response.data;
				$scope.jumbotronTitle = response.data.tituloActividad;
				$scope.jumbotronBody = response.data.cuerpoActividad;
				$scope.marker = {
				idKey: 0,
				coords: {
					latitude: response.data.ubicacionActividadX,
					longitude: response.data.ubicacionActividadY
				},
				options: {
					draggable: true
					}
				};				
				$scope.map = { center: { latitude: response.data.ubicacionActividadX, longitude: response.data.ubicacionActividadY}, zoom: 17 };
			})
		}
		obtenerActividad();

		// Formateo de la fecha de inicio de la actividad:
		$scope.formatearFechaInicio = function(date){ return input.formatearFechaInicio(date);}

		// Formateo de la duración estimada de la actividad:
		$scope.formatearDuracionEstimada = function(duracionEstimada){ return input.formatearDuracionEstimada(duracionEstimada);}

	// Participación del usuario en la actividad (Mejorable):

		// Obtención de la participación del usuario.
		function obtenerParticipacion(){
			console.log(typeof $scope.participacion_usuario)
			input.servicioListarParticipantesActividad(actividadId)
			.then(function(response){
				$scope.lista_participantes = response.data;
				$scope.participacion_usuario;
				for(var i = 0; i < $scope.lista_participantes.length; i++){
					if($scope.lista_participantes[i].usuarioId == usuarioId_actual){
						$scope.participacion_usuario = true;
						return
					}
				}
				$scope.participacion_usuario = false;
			
			});
		}
		obtenerParticipacion();

		// Cancelar participación del usuario:
		$scope.cancelarParticipacion = function(){
			input.servicioCancelarParticipacion(usuarioId_actual, actividadId)
			.then(function(response){ $scope.participacion_usuario = false;
			 						  $scope.actualizarUsuarios();});

		}

		// Confirmar participación del usuario:
		$scope.confirmarParticipacion = function(){
			input.servicioConfirmarParticipacion(usuarioId_actual, actividadId)
			.then(function(response){ $scope.participacion_usuario = true; 	
									  $scope.actualizarUsuarios();});

		}


		//agregado: actualizar la lista de usuarios
		$scope.usuarios = [];

		$scope.actualizarUsuarios = function()
		{
			input.servicioObtenerUsuariosActividadId(actividadId).success(function(data,status){
			$scope.usuarios= data;

			});

		}

		//agregado: comprobar si el usuario actual es organizador de la actividad (true/false)

		$scope.comprobarOrganizador = function()
		{

			if($scope.actividad.organizador.usuarioId==usuarioId_actual){return true;}
			else{return false;}
		
		}

		//agregado: expulsion de un usuario de la actividad
		$scope.expulsarUsuario = function(idExpulsado){
			input.servicioCancelarParticipacion(idExpulsado, actividadId)
			.then(function(response){ $scope.actualizarUsuarios();});

		}



		$scope.actualizarUsuarios();




});
})();
