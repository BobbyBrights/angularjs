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

	// 	Mensajes de error formulario:
		$scope.titulo_actividad_valido = true;
		$scope.titulo_actividad_msg_error = "undefined";

		$scope.ctdad_participantes_valido = true;
		$scope.ctdad_participantes_msg_error = "undefined";

		$scope.requisitos_actividad_valido = true;
		$scope.descripcion_actividad_valido = true;
		$scope.fecha_actividad_valido = true;
		$scope.duracion_actividad_valido = true;
		$scope.categoria_actividad_valido = true;
		$scope.tipo_actividad_valido = true;
		$scope.ubicacion_actividad_valido = true;


	// Funciones para los botones:
			$scope.go = function ( path ) { $location.path(path); };

			$scope.nueva_actividad = function(){ $scope.go('actividad/crear') };

			$scope.configuraciones = function(){ $scope.go('configuraciones'); };

			$scope.salir = function (){ input.servicioCerrarSesion(); $scope.go(''); };

		$scope.nuevaActividad = {};
		$scope.exito = -1 ;
		$scope.tipos = [];

		$scope.crearActividad = function()
		{

			console.log($scope.tipoId);
			var objJson = {

   					cuerpoActividad: $scope.nuevaActividad.cuerpoActividad,
					duracionEstimada:  "02:01:15",
    				fechaInicio:  "2016-05-02T08:15:03-03:00",
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
			$scope.go("/explora");
				

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