(function(){
    angular.module('angularSpa')
	.controller('logInController', function(
		$scope, 
		$location, 
		$rootScope, 
		$http,
		$timeout,
		$cookieStore, 
		input, 
		url){

		// Background:
		$rootScope.backgroundData = "url('/images/bg_v2.jpg') no-repeat center center fixed";
		$rootScope.backgroundSize = "cover";

		$scope.partA = true;	// Visibilidad de la primera parte del formulario
		$scope.partB = false;	// Visibilidad de la segunda parte del formulario
		$scope.error_general_visible = true; // Visibilidad del mensaje de error general
		$scope.msg_error_general = "undefined" // Mensaje de error general

		$scope.correo_usuario_valido = true;
		$scope.correo_usuario_error_msg = "undefined";
		$scope.correo_usuario = "";

		$scope.password_usuario_valido = true;
		$scope.password_usuario_error_msg = "undefined";
		$scope.password_usuario = "";		

		$scope.postLogIn = function (){
			console.log("SUBMIT: postSignUp_first");
			console.log("correo_usuario: '" + $scope.correo_usuario + "'");
			console.log("password: '" + $scope.password_usuario + "'");

			var response_correo_usuario = input.verificarCorreoValido($scope.correo_usuario);
			$scope.correo_usuario_valido = response_correo_usuario[0];
			$scope.correo_usuario_error_msg = response_correo_usuario[1];

			var response_password_usuario = input.verificarPasswordValida($scope.password_usuario);
			$scope.password_usuario_valido = response_password_usuario[0];
			$scope.password_usuario_error_msg = response_password_usuario[1];

			console.log(response_correo_usuario);
			console.log(response_password_usuario);

			if ($scope.correo_usuario_valido && $scope.password_usuario_valido){

				var objJson = {
					correo: $scope.correo_usuario,
					password: $scope.password_usuario
				};

			var login = input.servicioLogin(objJson) ;

				login.then(function(response){
					$scope.error_general_visible = true;  
					intercambiarFormulario()


					login.success(function(data,status){

					if(status==200)
					{
						$scope.usuarioAut = data ;
						$scope.logueado = true ;

						console.log(data);
						//enviar informacion del usuario a las cookies
						 //$cookieStore.put('usuario', $scope.usuarioAut);
						 $cookieStore.put('apellidoMaterno' , $scope.usuarioAut.apellidoMaterno);
						 $cookieStore.put('apellidoPaterno' , $scope.usuarioAut.apellidoPaterno );
						 $cookieStore.put('correo' , $scope.usuarioAut.correo );
						 $cookieStore.put('createdAt' , $scope.usuarioAut.createdAt );
						 $cookieStore.put('disponibilidad' , $scope.usuarioAut.disponibilidad);
						 $cookieStore.put('esAdministrador' , $scope.usuarioAut.esAdministrador);
						 $cookieStore.put('fechaNacimiento' , $scope.usuarioAut.fechaNacimiento);
						 $cookieStore.put('lastUpdate' , $scope.usuarioAut.lastUpdate);
						 $cookieStore.put('primerNombre' , $scope.usuarioAut.primerNombre);
						 $cookieStore.put('segundoNombre' , $scope.usuarioAut.segundoNombre );
						 $cookieStore.put('sexo' , $scope.usuarioAut.sexo);
						 $cookieStore.put('usuarioId' , $scope.usuarioAut.usuarioId );
						 $cookieStore.put('logueado' , $scope.logueado );
												 

					}

					
					})


					$timeout(function() {
			            $scope.go("/explora");
			        }, 4000);

				})
				.catch(function(response){
					$scope.error_general_visible = false;
					$scope.msg_error_general = response.data.mensaje;
				});


			}

		};

		$scope.submitForm_LogIn = $scope.postLogIn;

		// Otras funciones:
		// =======================================
		$scope.go = function ( path ) {
			console.log(path);
			$location.path(path); 
		};

 		function intercambiarFormulario () {
			$scope.partA = false;	// Visibilidad de la primera parte del formulario
			$scope.partB = true;	// Visibilidad de la segunda parte del formulario
		}

	})

})();
