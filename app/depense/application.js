var m = angular.module('application', ['inspir3', 'ngTagsInput']);

m.controller('DepenseControleur', ['$scope', 'Depense', 'Persistance', 'Liste', function($scope, Depense, Persistance, Liste) {

    var depenses    = [];
    var tags        = [];
    $scope.depenses = [];
    
    /*
     * 
     */
    var totaux = function(){
        
        $scope.totalAchat = 0;
        $scope.totalVente = 0;
        
        for(var i=0;i<$scope.depenses.length;i++){  
            console.log('achat: ' + $scope.depenses[i].achat + ', vente: ' + $scope.depenses[i].vente);
            
            if ( ($scope.depenses[i].achat != "") && ($scope.depenses[i].achat != undefined) ) $scope.totalAchat += parseFloat($scope.depenses[i].achat);
            if ( ($scope.depenses[i].vente != "") && ($scope.depenses[i].vente != undefined) ) $scope.totalVente += parseFloat($scope.depenses[i].vente);
        }
        
        $scope.difference = $scope.totalAchat - $scope.totalVente;
        $scope.perte = 100 - ($scope.totalVente/$scope.totalAchat)*100;
    }
    
    Persistance.chargement('data', function (Data){

        //depenses.push(Depense.creer(Liste.idSuivant(depenses), '2014-11-28T00:00:00.000Z', 'Aileron', 'Remy', 150, 120, 1530, ['windsurf', 'aileron']));
        //depenses.push(Depense.creer(Liste.idSuivant(depenses), '2014-11-28T00:00:00.000Z', 'Switchblade', 'Win33', 390, 250, 6530, ['windsurf']));
        
        if (Data != ""){
        	depenses = Data; 
	        $scope.depenses = depenses;
        }
        
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
            $scope.depenses = Liste.filtreParTags(depenses, tags);
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
		
        Persistance.sauvegarde('data', json, function (){
            $scope.message = 'Sauvegarde... OK';            
        });
    }
            
    /*
     * Ajouter une dépense  
     */
    $scope.ajouter = function() {
        console.log('ajouter()');
             
        var obj = Depense.creer(Liste.idSuivant(depenses), $scope.date, $scope.description, $scope.source, $scope.achat, $scope.vente, $scope.poids, tags);
        depenses.push(obj);
        
        $scope.filtre();
        totaux();        
        //sauver();        
        
        $scope.message = 'Ajout...';
      
        Persistance.ajout('data', obj, function (){
            $scope.message = 'Ajout... OK';            
        });
    }
    
    /*
     * Supprimer une dépense
     */
    $scope.supprimer = function(Id){
        console.log('supprimer(' + Id + ')');
        
        var i = Liste.index(depenses, Id);
                
        if (i > -1) {
            depenses.splice(i, 1);            
        }
        
        $scope.filtre();
        totaux();        
        //sauver();
        
        $scope.message = 'Suppression...';
      
        Persistance.suppression('data', { id: Id }, function (){
            $scope.message = 'Suppression... OK';            
        });
    }
    
}]);
