
    angular.module('angularSpa'  )
    .controller('sesionUsuarioCtlr', function($scope,$http,input , $cookies, $cookieStore ){

    	
    	
        $scope.usuarioPrimerNombre = function() { return  $cookieStore.get('primerNombre'); }
        $scope.usuarioId = function() { return  $cookieStore.get('usuarioId'); }

        $scope.logueado = function()
        {
        	var usrAut = $cookieStore.get('logueado') ;
        	if(usrAut==null){return false;}
        	if(usrAut!=null){return usrAut;}

        }

        $scope.cerrarSesion = function()
        {   
                         
                        

        				 $cookieStore.remove('usuarioAut');
						 $cookieStore.remove('apellidoMaterno');
						 $cookieStore.remove('apellidoPaterno');
						 $cookieStore.remove('correo');
						 $cookieStore.remove('createdAt');
						 $cookieStore.remove('disponibilidad');
						 $cookieStore.remove('esAdministrador');
						 $cookieStore.remove('fechaNacimiento');
						 $cookieStore.remove('lastUpdate');
						 $cookieStore.remove('primerNombre');
						 $cookieStore.remove('segundoNombre');
						 $cookieStore.remove('sexo');
						 $cookieStore.remove('usuarioId');
						 $cookieStore.remove('logueado');

        }


    });
