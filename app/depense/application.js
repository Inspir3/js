var m = angular.module('application', ['persistance']);

m.controller('DepenseControleur', ['$scope', 'depense', 'service', function($scope, depense, service) {
    
    $scope.depenses = [ {description: 'aileron', achat: 220, vente: 190, poids: 438},
                        {description: 'flotteur', achat: 700, vente: 500, poids: 7250} ];
 
    /*
     *  
     */
    $scope.ajouterDepense = function() {
      console.log('Ajout 7 !');
        
      //service.sauvegarder('fichier1', 'data1');
      
      $scope.depenses.push(depense.creer($scope.description, $scope.achat, $scope.vente, $scope.poids));
    }
    
}]);
