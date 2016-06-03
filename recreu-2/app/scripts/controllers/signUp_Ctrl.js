(function(){
    angular.module('angularSpa')
	.controller('signUpController', function(
		$scope, 
		$location, 
		$rootScope, 
		$http,
		$timeout, 
		input, 
		url,
		uibDateParser){

		// Background
		$rootScope.backgroundData = "url('/images/bg_v2.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.form_partA = true;	// Visibilidad de la primera parte del formulario
		$scope.form_partB = false;	// Visibilidad de la segunda parte del formulario
		$scope.form_partC = false;  // Visibilidad de la ultima parte del formulario
		$scope.error_general_visible = true; // Visibilidad del mensaje de error general
		$scope.msg_error_general = "undefined" // Mensaje de error general



		// Primera parte del formulario:
		// =================================================

		$scope.correo_usuario_valido = true;
		$scope.correo_usuario_error_msg = "undefined";
		$scope.correo_usuario = "";

		$scope.password_usuario_valido = true;
		$scope.password_usuario_error_msg = "undefined";
		$scope.password_usuario = "";


		$scope.postSignUp_first = function (){

			console.log("SUBMIT: postSignUp_first");
			console.log("correo_usuario: '" + $scope.correo_usuario + "'");
			console.log("password: '" + $scope.password_usuario + "'");

			var response_correo_usuario = input.verificarCorreoValido($scope.correo_usuario);
			$scope.correo_usuario_error_msg = response_correo_usuario[1];
			$scope.correo_usuario_valido = response_correo_usuario[0];

			var response_password_usuario = input.verificarPasswordValida($scope.password_usuario);
			$scope.password_usuario_error_msg = response_password_usuario[1];
			$scope.password_usuario_valido = response_password_usuario[0];


			if ($scope.correo_usuario_valido && $scope.password_usuario_valido){
				$scope.correo_usuario = response_correo_usuario[1];
				$scope.password_usuario = response_password_usuario[1];	
				input.servicioBuscarUsuarioPorCorreo($scope.correo_usuario)
		 		.then(function(response){
					$scope.error_general_visible = true;
					if(response.data != ""){
						$scope.correo_usuario_valido = false;
						$scope.correo_usuario_error_msg = "El correo ya se encuentra registrado en el sistema";
					}
					else{
						$scope.show_second_form();
					}

				})
				.catch(function(response){
					$scope.error_general_visible = false;
					$scope.msg_error_general = response.data.mensaje;
				});


			}



		};


		// Segunda parte del formulario:
		// =================================================

		$scope.primer_nombre_usuario_valido = true;
		$scope.primer_nombre_error_msg = "undefined";
		$scope.primer_nombre_usuario = "";

		$scope.segundo_nombre_usuario_valido = true;
		$scope.segundo_nombre_error_msg = "undefined";
		$scope.segundo_nombre_usuario = "";

		$scope.apellido_paterno_usuario_valido = true;
		$scope.apellido_paterno_error_msg = "undefined";
		$scope.apellido_paterno_usuario = "";

		$scope.apellido_materno_usuario_valido = true;
		$scope.apellido_materno_error_msg = "undefined";
		$scope.apellido_materno_usuario = "";

	    $scope.sexo_usuario_valido = true;
	    $scope.sexo_error_msg = "undefined";
	    $scope.sexos = [
	        { id: 1, name: 'Masculino' },
	        { id: 2, name: 'Femenino' }
	    ];
	    $scope.selected_sexo_usuario = null;

	    $scope.fecha_nacimiento_valida = true;
	    $scope.fecha_nacimiento_error_msg = "undefined";
		$scope.fecha_nacimiento_formato = 'dd/MM/yyyy';
		$scope.fecha_nacimiento = new Date();

		console.log(uibDateParser);

		/** Se encarga de verificar que la fecha de nacimiento este bien ingresada. Si no
			cumple con el formato establecido, fecha_nacimiento_valida deja de ser true
		**/
		$scope.chequearFechaNacimiento = function (){
			if(typeof $scope.fecha_nacimiento == "undefined"){
				console.log("\tFecha de nacimiento indefinida");
				$scope.fecha_nacimiento_error_msg = "Fecha de nacimiento invalida";
				$scope.fecha_nacimiento_valida = false;
			}
			else{
				console.log("\tFecha de nacimiento ha vuelto a ser definida");
				$scope.fecha_nacimiento_error_msg = "undefined";
				$scope.fecha_nacimiento_valida = true;
			}
		}


		$scope.postSignUp_second = function(){

			var response_primer_nombre = input.verificarNombreApellido($scope.primer_nombre_usuario, true, "Primer nombre");
			$scope.primer_nombre_usuario_valido = response_primer_nombre[0];
			$scope.primer_nombre_error_msg = response_primer_nombre[1];	

			var response_segundo_nombre = input.verificarNombreApellido($scope.segundo_nombre_usuario, false, "Segundo nombre");
			$scope.segundo_nombre_usuario_valido = response_segundo_nombre[0];
			$scope.segundo_nombre_error_msg = response_segundo_nombre[1];	

			var response_apellido_paterno = input.verificarNombreApellido($scope.apellido_paterno_usuario, true, "Apellido paterno");
			$scope.apellido_paterno_usuario_valido = response_apellido_paterno[0];
			$scope.apellido_paterno_error_msg = response_apellido_paterno[1];	

			var response_apellido_materno = input.verificarNombreApellido($scope.apellido_materno_usuario, false, "Apellido materno");
			$scope.apellido_materno_usuario_valido = response_apellido_materno[0];
			$scope.apellido_materno_error_msg = response_apellido_materno[1];	

			if ($scope.selected_sexo_usuario == null){
			    $scope.sexo_usuario_valido = false;
			    $scope.sexo_error_msg = "El sexo no ha sido seleccionado";
			}
			else{
				$scope.sexo_usuario_valido = true;
				var tmp_sexo;
				if ($scope.selected_sexo_usuario.name == "Masculino") tmp_sexo = true;
				else tmp_sexo = false;
			}

			var response_fecha_nacimiento = input.verificarFechaNacimiento($scope.fecha_nacimiento);
			$scope.fecha_nacimiento_valida = response_fecha_nacimiento[0];
			$scope.fecha_nacimiento_error_msg = response_fecha_nacimiento[1];

			if ($scope.primer_nombre_usuario_valido && 
				$scope.segundo_nombre_usuario_valido && 
				$scope.apellido_paterno_usuario_valido && 
				$scope.fecha_nacimiento_valida && 
				$scope.apellido_materno_usuario_valido &&  
				$scope.fecha_nacimiento_valida &&
				$scope.sexo_usuario_valido){

				var tmp_fecha_de_nacimiento = response_fecha_nacimiento[1];

				var objJson = {
				    apellidoPaterno:$scope.apellido_paterno_usuario,
				    primerNombre:$scope.primer_nombre_usuario,
				    correo:$scope.correo_usuario,
				    password:$scope.password_usuario,
				    fechaNacimiento: tmp_fecha_de_nacimiento, 
				    sexo: tmp_sexo,
				    esAdministrador: false
				}

				if($scope.segundo_nombre_usuario.trim() != "") objJson.segundoNombre = $scope.segundo_nombre_usuario;
				if($scope.apellido_materno_usuario.trim() != "") objJson.apellidoMaterno = $scope.apellido_materno_usuario;
			

		 		input.servicioSignUp(objJson)
		 		.then(function(response){
					$scope.error_general_visible = true;

					$scope.show_last_form();
					$timeout(function() {
			            $scope.go("/");
			        }, 5000); 

				})
				.catch(function(response){
					$scope.error_general_visible = false;
					$scope.msg_error_general = response.data.mensaje;
				});



			}


		}


		// Funciones comunes:
		// =================================================

		$scope.go = function ( path ) {
			console.log(path);
			$location.path(path); 
		};

		$scope.show_first_form = function(){
			$scope.form_partA = true;
			$scope.form_partB = false;
			$scope.correo_usuario = $scope.correo_usuario.replace("@usach.cl", "");		
			$scope.error_general_visible = true;
			$scope.msg_error_general = "undefined";
		}

		$scope.show_second_form = function(){
			$scope.form_partA = false;
			$scope.form_partB = true;		
		}

		$scope.show_last_form = function(){
			$scope.form_partA = false;
			$scope.form_partB = false;
			$scope.form_partC = true;
		}

		$scope.submitForm_first = $scope.postSignUp_first;
		$scope.submitForm_second = $scope.postSignUp_second;



	})

})();
