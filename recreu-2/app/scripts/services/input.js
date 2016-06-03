(function(){

    // Este servicio sirve para validar y procesar las entradas
    // de usuario en los formularios

    angular.module('angularSpa').factory('input', function($http, $cookieStore) {
        
        var input = {};
        var url_base = "http://ggggggggggg:8080/JavaEEBackend/"

        /** Entrada:    String con el 'cuerpo' del correo electronico del usuario (sin el dominio @usach.cl).
            Salida:     String con el correo electronico del usuario, incluyendo el dominio @usach.cl
        **/
        input.formatearCorreoInstitucional = function (correo){
            return correo + "@usach.cl"
        }

        /** Entrada:    String con el correo electronico (sin el dominio @usach.cl) del usuario.
            Salida:     Si el correo es valido:     [true, correo]
                        Si el correo es invalido:   [false, <* Mensaje de error *>]
        **/
        input.verificarCorreoValido = function (correo){
            if (correo.trim() == "") return [false, "El correo electronico no ha sido ingresado."];
            if (correo.indexOf("@usach.cl") >= 0) return [false, "No es necesario ingresar el dominio @usach.cl"];
            return [true, correo];
        }

        /** Entrada:    String con la password de algún usuario.
            Salida:     Si la password es valida:   [true, <* Password valida *>]
                        Si la password es invalida: [false, <* Mensae de error *>]
        **/
        input.verificarPasswordValida = function ( password ){
            if (password.trim() == "") return[false, "La contraseña no ha sido ingresada."];
            if (password.length < 6) return[false, "La contraseña debe tener al menos 6 carácteres"];
            return [true, password]
        }

        input.verificarNombreApellido = function ( entrada , mandatorio, nombre_dato){
            if (mandatorio == true && entrada.trim() == "") return [false, "El " + nombre_dato + " es obligatorio."];
            if (!(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/.test(entrada))) return [false, "El " + nombre_dato + " solo acepta caracteres alfabeticos."];
            return [true, entrada];
        }

        input.verificarFechaNacimiento = function ( fecha ){
            if (!(fecha instanceof Date)) return [false, "El formato de la fecha ingresado es invalído"];
            var fechaActual = new Date();
            var diferencia = (fechaActual.getFullYear() - fecha.getFullYear());
            if (fechaActual < fecha) return [false, "Has ingresado una fecha de nacimiento invalída"]; 
            if (diferencia < 15) return [false,"Debes tener como minimo 15 años de edad"];
            if (diferencia > 100) return [false,"¿Es tu edad mayor que 100 años?"];
            
            var yyyy = fecha.getFullYear().toString();
            var mm = ("0" + (fecha.getMonth() + 1)).slice(-2);
            var dd = ("0" + fecha.getDate()).slice(-2);

            return [true, yyyy+"-"+mm+"-"+dd];
        }

        input.formatearFechaInicio = function (date){
            console.log("call formatearFechaInicio", date);
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

        input.formatear_popOver = function (actividad){
            var str = 'Organizado por: ' + actividad.organizador.primerNombre + ' ' +  actividad.organizador.apellidoPaterno + "\n"
            if (actividad.personasMaximas == null) str = str + "Cantidad de personas requeridas: No especificada" + "\n";
            else str = str + "Cantidad de personas requeridas: " + actividad.personasMaximas + "\n";
            str = str + "Duración estimada: " + input.formatearDuracionEstimada(actividad.duracionEstimada) + "\n";
            return str;
        }


        input.formatearDuracionEstimada = function (duracionEstimada){
            var arr = duracionEstimada.split("-")[0].split(":");
            if (arr[0] > 0){ return arr[0]+":"+arr[1]+" Horas"; }
            else if(arr[0] == 0 && arr[1] == 0){ return "No especificada" }
            else if(arr[0] == 0){ return arr[1] + " Minutos"; }
        }

        input.servicioSignUp = function(objJson){
            var servicio = "usuarios";
            var url = url_base + servicio;
            return $http.post(url, objJson);
        }

        input.servicioBuscarUsuarioPorCorreo = function(correo){
            var servicio = "usuarios/buscar?correo="
            var url = url_base + servicio + correo;
            return $http.get(url);
        }

        input.servicioLogin = function(objJson){
            var servicio = "usuarios/login";
            var url = url_base + servicio;
            return $http.post(url, objJson);
        }

        input.servicioObtenerCategorias = function(objJson){
            var servicio = "categorias";
            var url = url_base + servicio;
            return $http.get(url);
        }

        input.servicioObtenerActividades = function(objJson){
            var servicio = "actividades";
            var url = url_base + servicio;
            return $http.get(url)
        }

        input.servicioObtenerActividadPorID = function(id){
            var servicio = "actividades/" + id.toString();
            var url = url_base + servicio;
            return $http.get(url);
        }

        input.servicioListarParticipantesActividad = function (id_actividad){
            var servicio ="actividades/" + id_actividad.toString() + "/usuarios";
            var url = url_base + servicio;
            return $http.get(url);
        }
        
        input.servicioCancelarParticipacion = function(id_usuario, id_actividad){
            var servicio ="usuarios/" + id_usuario.toString() + "/actividades/" + id_actividad.toString();
            var url = url_base + servicio;
                        console.log(url);

            return $http.delete(url);
        }

        input.servicioConfirmarParticipacion = function(id_usuario, id_actividad){

            var servicio ="usuarios/" + id_usuario.toString() + "/actividades/" + id_actividad.toString();
            var url = url_base + servicio;
            console.log(url);
            return $http.post(url);   
        }


        input.servicioCerrarSesion = function()
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

        input.servicioObtenerActividadPorID = function(id){
            var servicio = "actividades/" + id.toString();
            var url = url_base + servicio;
            return $http.get(url);
        }


        input.servicioCrearActividad = function(objJson){
            var servicio = "actividades";
            var url = url_base + servicio;
            console.log(url);
            return $http.post(url, objJson)
        }


         input.servicioObtenerTipos = function(int){
            var servicio = "categorias/";
            var url = url_base + servicio + int + "/tipos";
            console.log(url);
            return $http.get(url)
        }  



        input.servicioEliminarUsuario = function(int)
        {
            var servicio = "usuarios/";
            var url = url_base + servicio + int ;
            console.log(url);
            return $http.delete(url)

        }


        input.servicioObtenerReportes = function(){
            var servicio = "reportes";
            var url = url_base + servicio;
            console.log(url);
            return $http.get(url)
        }  

        input.servicioObtenerUsuarios = function(){
            var servicio = "usuarios";
            var url = url_base + servicio;
            console.log(url);
            return $http.get(url)
        }  


        return input;
    });

})();

