Plantilla Angular
=================

Plantilla para aplicación single page para ramo de Taller de Base de Datos.
Incluye manejo de dependencias por [Bower](http://bower.io/), preprocesador de hojas de estilo con [SASS](http://sass-lang.com/) y automatización de tareas con [Gulp Js](http://gulpjs.com/)

Requerimientos
--------------

* Node JS y NPM [descarga](https://nodejs.org/en/download/) o por [gestor de paquetes](https://nodejs.org/en/download/package-manager/)
* Gulp `$ npm install --global gulp`

Instalación
-----------

Una vez clonada la carpeta:
* Descargar dependencias de Node: `$ npm install`
* Descargar dependencias de Bower: `$ gulp bower`
* Iniciar servidor de desarrollo: `$ gulp serve`
* Generar versión de producción: `$ gulp build`

Agregar librerías de Front-end
---------------------------------
Usar la sintaxis `$ bower install --save-dev [librería]`. Luego inyectar la dependencia en la aplicación con `$ gulp wiredep`.

Otras funciones
---------------
* Enlazar dependencias Bower a index.html: `$ gulp wiredep`
* Agregar nuevos archivos JS a archivo index.html: `$ gulp inject`

