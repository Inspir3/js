var m = angular.module('inspir3', []);

m.factory('persistance', ['$http', function($http) {

    var url = 'http://www.inspir3.org/php/data.php?callback=JSON_CALLBACK';
        
    var application = 'depense';
    
    /*
     * 
     */    
    var sauvegarder = function(Fichier, Donnees, Callback) {
    
        $http.jsonp(url, { params: {
                                application: application, 
                                action: 'sauvegarder', 
                                fichier: Fichier,
                                donnees: Donnees
                            }
                         }).
            success(function() {
                Callback();
            }).
            error(function(Data) {
                console.log('[Erreur] ' + Data);
                Callback();
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
            success(function(Data) {
                Callback(Data);
            }).
            error(function(Data) {
                console.log('[Erreur] ' + Data);
                Callback();
            });
    }    

    return {
      sauvegarder: sauvegarder,
      charger: charger
    }
    
}]);
