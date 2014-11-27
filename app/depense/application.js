var m = angular.module('application', ['inspir3']);

m.controller('DepenseControleur', ['$scope', 'depense', 'persistance', function($scope, depense, persistance) {
        
    $scope.depenses = [];
    
    /*
     * 
     */
    var totaux = function(){
        
        $scope.totalAchat = 0;
        $scope.totalVente = 0;
        
        for(var i=0;i<$scope.depenses.length;i++){  
            $scope.totalAchat += parseFloat($scope.depenses[i].achat);
            $scope.totalVente += parseFloat($scope.depenses[i].vente);
        }
        
        $scope.difference = $scope.totalAchat - $scope.totalVente;
        $scope.perte = ($scope.totalAchat / $scope.totalVente - 1)*100;
    }
    
    persistance.charger('data', function (Data){
        
       $scope.depenses = Data; 
       
        totaux();
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
             
        $scope.depenses.push(depense.creer(idSuivant(), $scope.date, $scope.description, $scope.achat, $scope.vente, $scope.poids));
        
        totaux();
        
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
        
        totaux();
        
        sauver();
    }
    
}]);
