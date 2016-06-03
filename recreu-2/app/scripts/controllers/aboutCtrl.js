(function(){
    angular.module('angularSpa')
    .controller('AboutCtrl', function($scope){
        $scope.items = [
          'Bower',
          'Sass',
          'Gulp'
        ];
    });
})();
