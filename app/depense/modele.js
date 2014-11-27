var m = angular.module('application');

m.factory('depense', function() {
    
    /*
     * 
     */
    var creer = function(Id, Date, Description, Achat, Vente, Poids) {

        return {
            id: Id,
            date: Date,
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
