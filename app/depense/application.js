var m = angular.module('application', ['inspir3']);

m.controller('DepenseControleur', ['$scope', 'depense', 'persistance', function($scope, depense, persistance) {
    
    $scope.depenses = [ {description: 'aileron', achat: 220, vente: 190, poids: 438},
                        {description: 'flotteur', achat: 700, vente: 500, poids: 7250} ];
     
    /*
     * 
     */
    var sauver = function(){
        persistance.sauvegarder('data', angular.toJson($scope.depenses));         
    }
    
    /*
     *  
     */
    $scope.ajouterDepense = function() {
        console.log('ajouterDepense()');
             
        $scope.depenses.push(depense.creer($scope.description, $scope.achat, $scope.vente, $scope.poids));
        
        sauver();
    }
    
}]);
