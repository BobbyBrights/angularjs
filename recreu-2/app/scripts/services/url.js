(function(){

    // Servicio que sirve para guardar la URL, para que no sea necesario
    // escribirla todo el tiempo

    angular.module('angularSpa').factory('url', function() {
        
        var url_base = "undefined_url_base";

        var url = {};

        url.urlInvalida = function(urlArg){
            if(urlArg == null) return true;
            return false;
        }


        url.getUrlServicio = function ( servicio ){
            return url_base + servicio;
        }

        // Obtener la URL desde localStorage
        url.obtenerURLActors = function(){
            return localStorage.getItem("urlActors");
        }

        // Guardar la URL en localStorage (y retorna la URL tambien, ya que quizas
        // se formateo de forma distinta)
        url.guardarURLActors = function(urlActors){

            if(urlActors == null) return;

            var length = urlActors.length;

            // Eliminar el ultimo slash, si es que lo tiene
            if(urlActors[length-1] == "/"){
                urlActors = urlActors.substr(0, length-1);
            }

            localStorage.setItem("urlActors", urlActors);
            return urlActors;
        }

        return url;
    });

})();

