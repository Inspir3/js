var m = angular.module('application');

m.factory('depense', function() {
    
    /*
     * 
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
    
    /*
     * Retourne un id disponible
     */
    var idSuivant = function(Depenses){
        
        if (Depenses.length == 0) return 1;
        
        return Depenses[Depenses.length-1].id + 1;        
    }
    
    /*
     * Retourne la position d'une dépense dans le tableau
     */
    var index = function(Depenses, Id){
        
        for(var i=0;i<Depenses.length;i++){
            if (Depenses[i].id == Id){
                return i;
            }
        }
        
        return -1;        
    }

    /*
     * Retourne la position d'une dépense dans le tableau
     */
    var contientTag = function(Depense, Tag){

        for(var i=0;i<Depense.tags.length;i++){
            if (Depense.tags[i] == Tag) return true;
        }
        
        return false;
    }
          
    /*
     * Retourne la position d'une dépense dans le tableau
     */
    var contient = function(Depense, Tags){
        
        var cpt = 0;
        
        for(var i=0;i<Tags.length;i++){
            if (contientTag(Depense, Tags[i])) cpt++;
        }
                
        return (cpt == Tags.length);
    }

    /*
     * Retourne la position d'une dépense dans le tableau
     */
    var filtre = function(Depenses, Tags){
        
        var ret = [];
        
        for(var i=0;i<Depenses.length;i++){
            if (contient(Depenses[i], Tags)){
                ret.push(Depenses[i]);
            }
        }
        
        return ret;        
    }

    return {
        creer: creer,
        idSuivant: idSuivant,
        index: index,
        filtre: filtre
    }

});
