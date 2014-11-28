var m = angular.module('application', ['inspir3', 'ngTagsInput']);

m.controller('DepenseControleur', ['$scope', 'depense', 'persistance', function($scope, depense, persistance) {

    var depenses = [];
    var tags = [];
    $scope.depenses = [];
    
    /*
     * 
     */
    var totaux = function(){
        
        $scope.totalAchat = 0;
        $scope.totalVente = 0;
        
        for(var i=0;i<$scope.depenses.length;i++){  
            $scope.totalAchat += parseFloat($scope.depenses[i].achat);
            
            if ($scope.depenses[i].vente != ""){
                $scope.totalVente += parseFloat($scope.depenses[i].vente);
            }
        }
        
        $scope.difference = $scope.totalAchat - $scope.totalVente;
        $scope.perte = 100 - ($scope.totalVente/$scope.totalAchat)*100;
    }
    
    persistance.charger('data', function (Data){
        
        depenses = Data; 
        
        //depenses.push(depense.creer(depense.idSuivant(depenses), '2014-11-28T00:00:00.000Z', 'Aileron', 'Remy', 150, 120, 1530, ['windsurf', 'aileron']));
        //depenses.push(depense.creer(depense.idSuivant(depenses), '2014-11-28T00:00:00.000Z', 'Switchblade', 'Win33', 390, 250, 6530, ['windsurf']));
               
        $scope.depenses = depenses;
        
        totaux();
    });    

    /*
     *
     */
    var tagsVersTableau = function(Tags){
        
        var ret = [];
        
        for(var i=0;i<Tags.length;i++){
            ret.push(Tags[i].text);
        }
        
        return ret;
    }
    
    /*
     * 
     */
    $scope.filtre = function(){
        
        tags = tagsVersTableau($scope.tags);
        
        console.log(tags);
        
        if (tags.length > 0){
            $scope.depenses = depense.filtre(depenses, tags);
        }else{
            $scope.depenses = depenses;
        }
        
        totaux();
    }
                                   
    /*
     * Sauvegarde les données sur le serveur
     */
    var sauver = function(){

        $scope.message = 'Sauvegarde...';
        
        console.log(depenses);
        var json = angular.toJson(depenses);
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
             
        depenses.push(depense.creer(depense.idSuivant(depenses), $scope.date, $scope.description, $scope.source, $scope.achat, $scope.vente, $scope.poids, tags));
        
        $scope.filtre();
        totaux();        
        sauver();        
    }
    
    /*
     * Supprimer une dépense
     */
    $scope.supprimer = function(Id){
        console.log('supprimer(' + Id + ')');
        
        var i = depense.index(depenses, Id);
                
        if (i > -1) {
            depenses.splice(i, 1);            
        }
        
        $scope.filtre();
        totaux();        
        sauver();
    }
    
}]);
