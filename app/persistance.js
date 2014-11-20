var persistance = angular.module('persistance', []);

persistance.factory('service', ['$http', function($http) {

    var url = 'http://regis.baril.free.fr/data.php5?callback=JSON_CALLBACK';
    var application = 'depense';
    
    /*
     * 
     */    
    var sauvegarder = function(Fichier, Donnees) {
    
        $http.jsonp(url, { params: {
                                    application: application, 
                                    action: 'sauvegarder', 
                                    fichier: Fichier, 
                                    donnees: Donnees
                                  } 
                         }).
            success(function(data) {
                console.log('Données: ' + data);
            }).
            error(function(data) {
                console.log('[Erreur] ' + data);
            });
        
    }
    
    /*
     * 
     */    
    var charger = function(Fichier) {
    }    

    return {
      sauvegarder: sauvegarder,
      charger: charger
    }
    
}]);