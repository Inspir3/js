var m = angular.module('application');

//---------------------------------------------------------------------------------------------------------------------------
//Classe Depense
//---------------------------------------------------------------------------------------------------------------------------
m.factory('Depense', function() {
    
    /*
     * Constructeur
     */
    var creer = function(Id, Date, Description, Source, Achat, Vente, Poids, Tags) {

        return {
            id: Id,
            date: Date,
            description: Description,
            source: Source,
            achat: Achat,
            vente: Vente,
            poids: Poids,
            tags: Tags
        }
    }
            
    return {
        creer: creer        
    }

});
