var m = angular.module('inspir3').directive('tag', function() {

  var link = function(Scope, Element, Attrs) {
    console.log('link');
    
    Scope.tags = [];    //Liste des tags, alimente le <ul><li>
      
    
    /*
     * Detecte la touche espace pour créer un tag
     */
    Scope.keyup = function(Event){
            
      if (Event.which != 32) return;    //On s'active que sur un espace
            
      if (Scope.input == '') return;
      
      Scope.tags.push(Scope.input);     
      
      Scope.input = '';      
      
      Scope.ngChange();
    }
    
    /*
     * Supprime un tag existant
     */
    Scope.supprimer = function(Tag){
      var i;
      
      for(i=0;i<Scope.tags.length;i++) if (Scope.tags[i] == Tag) break;
      
      Scope.tags.splice(i, 1);       
      
      Scope.ngChange();
    }
  }
  
  return {
    restrict: 'E',      //Recherche que les élements <tag></tag>
    scope: {            //Scope privé
      tags: '=ngModel', //La variable Scope.value est relié au monde extérieur
      ngChange: '&',    //Prévient le monde exterieur via l'evenement ng-change
    },        
    template: '<input type="text" ng-keyup="keyup($event)" ng-model="input"><ul class="Tag"><li ng-repeat="tag in tags">{{tag}} <a ng-click="supprimer(tag)">x</a></li></ul>',
    link: link    
  }

});