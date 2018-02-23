(function(){
'use strict';

const componentConfig = {
  templateUrl: 'app/components/search-by-stars/search-by-stars.template.html',
  controller: SearchByStarsComponentController,
  bindings: {
    search: '&',
    iconsDirectory: '<'
  }
};

angular.module('almundoApp')
.component('searchByStarsComponent', componentConfig);

SearchByStarsComponentController.$inject = ['$timeout'];
function SearchByStarsComponentController($timeout){
  const $ctrl = this;

  $ctrl.$onInit = function(){
    $ctrl.starIconRoute = $ctrl.iconsDirectory + 'filters/star.svg';
    $ctrl.viewStarsArray = [false, false, false, false, false];
    $ctrl.viewAll = true;
  };
  
 
  // ===================================================================
  // Debouncing stars options selection
  // =================================================================== 
  const changes = [];
  const delayBeforeRequest = 2000;
  const cancellChanges = function(){
    changes.forEach(function(change){
      $timeout.cancel(change);
    });
  }
  $ctrl.changeOptionAction = function(){
    cancellChanges();
    changes.push($timeout(function(){
      console.log('stars changed manage!');
      $ctrl.viewAll = false;
      $ctrl.search({starsArray: $ctrl.viewStarsArray});
    }, delayBeforeRequest));
  };
  
  // ===================================================================
  // change view All Action
  // =================================================================== 
  $ctrl.changeViewAllAction = function(){
    if ($ctrl.viewAll === true){
      $ctrl.viewStarsArray[0] = false;
      $ctrl.viewStarsArray[1] = false;
      $ctrl.viewStarsArray[2] = false;
      $ctrl.viewStarsArray[3] = false;
      $ctrl.viewStarsArray[4] = false;
      cancellChanges();
       $ctrl.search({starsArray: [true, true, true, true, true]});
    }
  };  

}

})();
