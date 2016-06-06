(function(){
    angular.module('angularSpa')
.controller('nuevaActividadController', function($scope, $http, url, input, $rootScope, $location ,  $cookieStore ,  $cookies){

	// Elementos de la vista:

		// Background:
		$rootScope.backgroundData = "url('/images/bg3.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		// Jumbotron:
		$scope.jumbotronTitle = "Nueva Actividad";
		$scope.jumbotronBody = "¿Tienes ganas de participar en una actividad en particular y no la encuentras en el espacio de exploración?... ¿Si?... Recuerda que en RECREU puedes crear y organizar tu mismo la actividad que estás buscando. Ingresa con precisión la información solicitada a continuación, de manera que los otros usuarios puedan interesarse en la actividad que estás organizando."

		// Barra de navegación:
		$scope.nombre_usuario = $cookieStore.get('primerNombre') + " " + $cookieStore.get('apellidoPaterno');
		$scope.esAdmin= $cookieStore.get('esAdministrador');


	// 	Mensajes de error formulario:
		$scope.titulo_actividad_valido = true;
		$scope.titulo_actividad_msg_error = "undefined";
		$scope.ctdad_participantes_valido = true;
		$scope.ctdad_participantes_msg_error = "undefined";
		$scope.requisitos_actividad_valido = true;
		$scope.descripcion_actividad_valido = true;
		$scope.fecha_actividad_valido = true;
		$scope.horario_valido = true;
		$scope.categoria_actividad_valido = true;
		$scope.tipo_actividad_valido = true;
		$scope.ubicacion_actividad_valido = true;


	// Funciones para los botones:
			$scope.go = function ( path ) { $location.path(path); };

			$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

			$scope.configuraciones = function(){ $scope.go('configuraciones'); };

			$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };

			$scope.reportes = function(){ $scope.go("/reportes");}


		$scope.nuevaActividad = {};
		$scope.exito = -1 ;

		$scope.nuevaActividad.horas=0;
		$scope.nuevaActividad.minutos=0;

		$scope.nuevaActividad.fechaInicio = new Date();
		$scope.nuevaActividad.fecha = null;
		$scope.nuevaActividad.horario = null;


		$scope.nuevaActividad.ubicacionActividadX = -33.447804;
		$scope.nuevaActividad.ubicacionActividadY = -70.682473;

		$scope.tipos = [];

		$scope.crearActividad = function()
		{

			var anno = $scope.nuevaActividad.fecha.getFullYear();
			var mes = $scope.nuevaActividad.fecha.getMonth() + 1 ;
			var dia = $scope.nuevaActividad.fecha.getDay() ; 

			var hora = $scope.nuevaActividad.horario.getHours();	
			var minuto = $scope.nuevaActividad.horario.getMinutes();

			if(mes<10){mes = "0" + mes}
			if(dia<10){dia = "0" + dia}
			if(hora<10){hora = "0" + hora}
			if(minuto<10){minuto= "0" + minuto}


			if($scope.nuevaActividad.minutos<10){$scope.nuevaActividad.minutos = "0" + $scope.nuevaActividad.minutos}
			if($scope.nuevaActividad.horas<10){$scope.nuevaActividad.horas = "0" + $scope.nuevaActividad.horas}

			$scope.nuevaActividad.fechaInicio = anno + "-" + mes + "-" + dia + "T" + hora + ":" + mes + ":00-03:00" ;
			$scope.nuevaActividad.duracionEstimada = $scope.nuevaActividad.horas + ":" + $scope.nuevaActividad.minutos + ":00"


			console.log("duracionEstimada", $scope.nuevaActividad.duracionEstimada);
			console.log($scope.nuevaActividad.fechaInicio);

			var objJson = {
   					cuerpoActividad: $scope.nuevaActividad.cuerpoActividad,
					duracionEstimada:  $scope.nuevaActividad.duracionEstimada,
    				fechaInicio:  $scope.nuevaActividad.fechaInicio,
    				requerimientosActividad: $scope.nuevaActividad.requerimientosActividad ,
   					tipo: {
       							tipoId:  $scope.nuevaActividad.tipoId,
  								 },
   					tituloActividad:  $scope.nuevaActividad.tituloActividad,
    				organizador:{
        					usuarioId: $cookieStore.get('usuarioId')
    				},
    				ubicacionActividadX: $scope.nuevaActividad.ubicacionActividadX,
    				ubicacionActividadY: $scope.nuevaActividad.ubicacionActividadY 
				}



			console.log(objJson);

			input.servicioCrearActividad(objJson).success(function(data,status){
			$scope.exito = 1;
			input.servicioObtenerActividades();
			$scope.go("explora");
				

				}).error(function(error,status)
				{
					console.log(error);
					$scope.exito = 0;


				});


		}


		$scope.categorias = [];
		
		input.servicioObtenerCategorias().success(function(data,status){
			$scope.categorias = data;
		});
		

		$scope.tipos = [];
		$scope.categoriaSelectId = 1;

		$scope.actualizarTipos = function(){

				input.servicioObtenerTipos($scope.categoriaSelectId).success(function(data)
				{
					
						$scope.tipos = data ;
						console.log(data);
						

				}).error(function(error,status)
					{	

					}
				);

			}

			






});
})();
