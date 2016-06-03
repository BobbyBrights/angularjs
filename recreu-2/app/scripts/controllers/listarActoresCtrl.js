(function(){
    angular.module('angularSpa')
.controller('listarActoresCtrl', function($scope, $http, url, input, $interval){

	// Obtiene cual actor tiene abierto el dialogo de confirmacion para eliminar.
	// Al hacer click en el boton "X" se cambia esta ID a la ID del actor, y con eso
	// abre un dialogo de confirmacion para eliminar el actor.
	$scope.dialogoConfirmacion = {
		id: 0,
		// Prepara el dialogo de confirmacion con la ID del actor
		preparar: function(actorArg){
			this.id = actorArg.actorId;
		},
		// Booleano, verdadero si es el actor "actorArg" el cual se ha seleccionado
		// para mostrar su dialogo de confirmacion
		mostrando: function(actorArg){
			if(actorArg.actorId == this.id){
				return true;
			}
			return false;
		},
		// Cerrar el dialogo de confirmacion
		cerrar: function(){
			this.id = 0;
		}
	};

	// Similar pero se pasa el actor completo ya que se necesitan mas datos
	$scope.formularioUpdate = {
		actor: null,
		string: null,
		preparar: function(actorArg){
			this.actor = actorArg;
			this.string = this.actor.firstName+" "+this.actor.lastName;
			$scope.dialogoConfirmacion.cerrar();
		},
		mostrando: function(actorArg){
			if(this.actor != null && actorArg.actorId == this.actor.actorId){
				return true;
			}
			return false;
		},
		cerrar: function(){
			this.actor = null;
			this.string = null;
		}
	};



	$scope.updateActor = function(){

		// Guardar la URL
		$scope.urlActores = url.guardarURLActors($scope.urlActores);

		if(url.urlInvalida($scope.urlActores)) return;

		var urlActores = $scope.urlActores;

		var entradaNombres = input.obtenerNombre($scope.formularioUpdate.string);

		if(entradaNombres == false){
			$scope.mensajeEstado = "Error de formato: debe ser primer nombre, y luego ultimo nombre";
			return;
		}	

		// Obtener el primer y segundo nombre
		var firstname = entradaNombres[0];
		var lastname = entradaNombres[1];

		// Crear el objeto JSON
		var objJson = {
			firstName: firstname,
			lastName: lastname
		};

		var id = $scope.formularioUpdate.actor.actorId;

		$http.put(urlActores + "/"+id, objJson).then(function(){
			$scope.mensajeEstado = "Se actualizo '"+firstname+" "+lastname+"' exitosamente";
			$scope.formularioUpdate.cerrar();

			// Busqueda para encontrar el que se actualizo, para modificarlo (para no tener
			// que hacer el GET denuevo. Hacerlo asi es mas rapido)
			$scope.actores.forEach(function (actor, i) {
				if(actor.actorId == id){
					actor.firstName = firstname;
					actor.lastName = lastname;
					return;
				}
			});

		}).catch(function(error){
			$scope.mensajeEstado = "Se obtuvo un error (codigo: "+error.status+")";
		});


	}



	$scope.deleteActor = function(id){

		// Guardar la URL
		$scope.urlActores = url.guardarURLActors($scope.urlActores);

		if(url.urlInvalida($scope.urlActores)) return;

		var urlActores = $scope.urlActores;
	
		$http.delete(urlActores + "/"+id)

		// Exito
		.then(function(result){
			
			// Realizar una busqueda por todos los actores
			$scope.actores.forEach(function (actor, i) {
				if(actor.actorId == id){
					// Cuando se encuentra el actor que se quiere eliminar, se borra del arreglo.
					// De esta forma se borra de la BD, pero se actualiza la vista tambien.
					$scope.mensajeEstado = "Se elimino '"+actor.firstName+" "+actor.lastName+"' exitosamente";
					$scope.actores.splice(i, 1);					
					return;
				}
			});
		})

		// Error
		.catch(function(error){
			$scope.mensajeEstado = "Se obtuvo un error (codigo: "+error.status+")";
		});
	}



	$scope.obtenerActores = function(){

		// Guardar la URL
		$scope.urlActores = url.guardarURLActors($scope.urlActores);

		if(url.urlInvalida($scope.urlActores)) return;

		// Limpiar los actores actuales
		$scope.actores = null;

		$http.get($scope.urlActores)

		// Exito
		.then(function(result){
			// Obtener los datos
			$scope.actores = result.data;
			// Limpiar mensaje de error (si es que habia)
			$scope.mensajeEstado = "";
		})

		// Error
		.catch(function(error){
			// Vaciar arreglo de actores
			$scope.actores = [];

			// Colocar un mensaje de error
			$scope.mensajeEstado = "Se obtuvo un error (codigo: "+error.status+")";
		});
	}


	// Cargar la URL guardada
	$scope.urlActores = url.obtenerURLActors();
	
	// Cargar los actores al inicializar el controlador
	$scope.obtenerActores();



});
})();
