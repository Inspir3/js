var m = angular.module('inspir3', []);

m.factory('persistance', ['$http', function($http) {

    //var url = 'http://regis.baril.free.fr/data.php5?callback=JSON_CALLBACK';
    
    var url = 'http://www.inspir3.org/php/data.php?callback=JSON_CALLBACK';
        
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
    var charger = function(Fichier, Callback) {
        
        $http.jsonp(url, { params: {
                                        application: application, 
                                        action: 'charger', 
                                        fichier: Fichier 
                                        }
                                    }).
            success(function(data) {
                console.log(data);
            
                Callback(data);
            }).
            error(function(data) {
                console.log('[Erreur] ' + data);
            });
    }    

    return {
      sauvegarder: sauvegarder,
      charger: charger
    }
    
}]);