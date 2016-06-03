var gulp = require('gulp'), 
    bower   = require('gulp-bower'), //ejecuta bower desde gulp
    server  = require('gulp-server-livereload'), //servidor
    sass = require('gulp-sass'), //compilador sass de gulp
    inject = require('gulp-inject'),//inyecta scripts propios
    useref = require('gulp-useref'),//concatena referencias
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate'),
    wiredep = require('wiredep').stream; //enlaza dependencias bower

//Configuracion de servidor
var serverConfig = {
        livereload: true,
        port: 9000,
        open: true
    };

gulp.task('bower', function(){
    return bower({
        directory: './app/bower_components'
    });
});

gulp.task('wiredep', function () {
    return gulp.src('./app/index.html')
    .pipe(wiredep({
        directory: './app/bower_components',
        bowerJson: require('./bower.json')        
    }))
    .pipe(gulp.dest('./app')); 
});

//Compila archivos Sass a Css 
gulp.task('sass', function(){
    gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))    
    .pipe(gulp.dest('./app/styles'));   
});

gulp.task('inject', function(){
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/scripts/app.js','./app/scripts/**/*.js', './app/styles/**/*.css'], {read: false});
 
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app'));

});

//Inicia el servidor web en la carpeta dist
gulp.task('webserver', function(){  
    gulp.src('app')
    .pipe(server(serverConfig));    
});

gulp.task('watch', function(){
    gulp.watch('./app/styles/**/*.scss', ['sass']);
    gulp.watch('./app/scripts/**/*.js', ['inject']);
});

gulp.task('copy', function(){
    var html = gulp.src('./app/views/*.html')
    .pipe(gulp.dest('./dist/views'));
    var images = gulp.src('./app/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
    return ['html', 'images'];
});



gulp.task('clean', function(){
    return del([
        './dist/**/*'
    ]);
});

gulp.task('useref', function () {
    var assets = useref.assets();
 
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js',ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref()) 
        .pipe(gulp.dest('dist'));
});

gulp.task('init', ['bower', 'wiredep']);
gulp.task('build', ['clean', 'sass', 'inject', 'useref', 'copy']);
gulp.task('default', ['sass','inject','watch']);

gulp.task('serve', ['default','webserver']);
