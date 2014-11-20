var m = angular.module('application');

m.factory('depense', function() {

    /*
     * 
     */
    var creer = function(Description, Achat, Vente, Poids) {

        return {
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
