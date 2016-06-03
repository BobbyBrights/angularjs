
var app = angular.module('angularSpa');

app.controller('mapCtrl', ['$scope', function ($scope) {

	
		
	
	$scope.marker = {
	id: 0,
	coords: {
		latitude: -33.447804,
		longitude: -70.682473
	},
	options: {
		draggable: true
		}
	};




	$scope.map = {
		center: {
			latitude: -33.447804, 
			longitude: -70.682473
		}, 
		zoom: 16,
		options : {
			scrollwheel: true
		},
		events: 
		{
			 click: function (map, eventName, originalEventArgs)
			 {
			 	var e = originalEventArgs[0];
			 	$scope.marker.coords.latitude = e.latLng.lat();
			 	$scope.marker.coords.longitude= e.latLng.lng();
			 	$scope.$apply();


			 }

		}
	};

	




}]);




/* CODIGO ORIGINAL:

angular.module('angularSpa')
.controller('mapCtrl', function ($scope) {

	$scope.actualizar = function(){
  	$scope.map.markers[0].coords.latitude = $scope.latitude
    $scope.map.markers[0].coords.longitude = $scope.longitude;
  }

    angular.extend($scope, {
        map: {
            center: {
                latitude: 42.3349940452867,
                longitude:-71.0353168884369
            },
            zoom: 11,
            markers: [],
            events: {
            click: function (map, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var lat = e.latLng.lat(),lon = e.latLng.lng();
                
                if($scope.map.markers.length == 0){
                  $scope.map.markers.push({
                    id: Date.now(),
                    coords: {
                        latitude: lat,
                        longitude: lon
                    }
                });

                } else {

                  $scope.map.markers[0].coords.latitude = lat;
                  $scope.map.markers[0].coords.longitude = lon;
                }

                $scope.$apply();
            }
        }
        }
    });
});*/

