var m = angular.module('application', ['inspir3']);

m.controller('DepenseControleur', ['$scope', 'depense', 'persistance', function($scope, depense, persistance) {
        
    //$scope.depenses = [ {id: 1, description: 'aileron', achat: 220, vente: 190, poids: 438} ];
    $scope.depenses = [];
    
    persistance.charger('data', function (Data){
        
       $scope.depenses = Data; 
        
    });
    
    /*
     * Retourne un id disponible
     */
    var idSuivant = function(){
        
        if ($scope.depenses.length == 0) return 1;
        
        return $scope.depenses[$scope.depenses.length-1].id + 1;        
    }
    
    /*
     * Retourne la position d'une dépense dans le tableau
     */
    var index = function(DepenseId){
        
        for(var i=0;i<$scope.depenses.length;i++){
            if ($scope.depenses[i].id == DepenseId){
                return i;
            }
        }
        
        return -1;        
    }

    /*
     * Sauvegarde les données sur le serveur
     */
    var sauver = function(){

        $scope.message = 'Sauvegarde...';
        
        var json = angular.toJson($scope.depenses);
        console.log(json);
				
        persistance.sauvegarder('data', json, function (){
            $scope.message = '';            
        });          
    }
            
    /*
     * Ajouter une dépense  
     */
    $scope.ajouter = function() {
        console.log('ajouter()');
             
        $scope.depenses.push(depense.creer(idSuivant(), $scope.description, $scope.achat, $scope.vente, $scope.poids));
        
        sauver();
    }
    
    /*
     * Supprimer une dépense
     */
    $scope.supprimer = function(Id){
        console.log('supprimer(' + Id + ')');
        
        var i = index(Id);
                
        if (i > -1) {
            $scope.depenses.splice(i, 1);            
        }
        
        sauver();
    }
    
}]);
