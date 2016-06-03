(function(){
    angular.module('angularSpa')
.controller('agregarActorCtrl', function($scope, $http, url, input){

	// Cargar la URL guardada
	$scope.urlActores = url.obtenerURLActors();

	$scope.postActor = function(){

		// Guardar la URL
		$scope.urlActores = url.guardarURLActors($scope.urlActores);

		if(url.urlInvalida($scope.urlActores)) return;

		// Obtener los datos del formulario
		var urlActores = $scope.urlActores;

		// Validar entrada (debe tener el formato correcto) y obtener
		// el primer y segundo nombre por separado (en un arreglo de strings)
		var entradaNombres = input.obtenerNombre($scope.nombreCompleto);

		if(entradaNombres == false){
			$scope.mensajeEstado = "Error de formato: debe ser primer nombre, y luego ultimo nombre";
			return;
		}		

		// Obtener el primer y segundo nombre
		var firstname = entradaNombres[0];
		var lastname = entradaNombres[1];

		// Crear el objeto JSON para postearlo
		var objJson = {
			firstName: firstname,
			lastName: lastname
		};

		$http.post(urlActores, objJson)

		// Cuando hay exito
		.then(function(){
			// Colocar un mensaje de exito
			$scope.mensajeEstado = "Se agrego '"+firstname+" "+lastname+"' exitosamente";

			// Limpiar el formulario
			$scope.nombreCompleto = "";
		})

		// Cuando hay error
		.catch(function(error){
			// Colocar un mensaje de error
			$scope.mensajeEstado = "Se obtuvo un error (codigo: "+error.status+")";
		});


	} // Fin funcion postActor



});
})();
