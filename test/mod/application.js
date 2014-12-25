var m = angular.module('test', ['inspir3']);

m.controller('TestControleur', ['$scope', function($scope) {
  
  /*
   * 
   */
  $scope.changementDesTags = function(){  
    console.log('changement des tags: ' + $scope.tags);
  }
  
  
}]);
    