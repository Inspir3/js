angular.module('main', []).controller('DepenseController', ['$scope', function($scope) {
    
 
    $scope.ajouterDepense = function() {
      console.log('Ajout !');
      $scope.todoText = '';
    };
    
}]);