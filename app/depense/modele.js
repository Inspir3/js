var m = angular.module('application');

m.factory('depense', function() {
    
    /*
     * 
     */
    var creer = function(Id, Description, Achat, Vente, Poids) {

        return {
            id: Id,
            description: Description,
            achat: Achat,
            vente: Vente,
            poids: Poids
        }
    }

    return {
        creer: creer
    }

});
