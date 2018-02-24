(function(){
'use strict';

// =====================================================
// config
const componentConfig = {
  template: getTemplate(),
  controller: SearchByStarsComponentController,
  bindings: {
    search: '&',
    iconsDirectory: '<'
  }
};

// =====================================================
// declare
angular.module('almundoApp')
.component('searchByStarsComponent', componentConfig);

// =====================================================
// logic
SearchByStarsComponentController.$inject = ['$timeout'];
function SearchByStarsComponentController($timeout){
  const $ctrl = this;

  // =====================================
  // On init
  $ctrl.$onInit = function(){
    $ctrl.starIconRoute = $ctrl.iconsDirectory + 'filters/star.svg';
    $ctrl.viewStarsArray = [false, false, false, false, false];
    $ctrl.viewAll = true;
    $ctrl.componentBodyOpen = true;
  };
  
 
  // =====================================
  // Debouncing stars options selection
  const changes = [];
  const delayBeforeRequest = 1000;
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
  
  // ====================================
  // change view All Action
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

  $ctrl.toggleComponentBody = function(){
    $ctrl.componentBodyOpen = !$ctrl.componentBodyOpen;
  };

}

// =====================================================
// Template
function getTemplate(){
  const getStarsElements = function(starsNumber){
    let stringToReturn = '';
    for(let i = 0; i < starsNumber; i++){
      stringToReturn += '<ng-include src="$ctrl.starIconRoute"></ng-include>'; 
    }
    return stringToReturn;
  }

  const getStarFilterBlock = function(starsNumber){
    return `
      <div class="star-filter-block">
        <input  type="checkbox" 
                ng-checked="$ctrl.viewStarsArray[${starsNumber-1}]" 
                ng-change="$ctrl.changeOptionAction()" 
                ng-model="$ctrl.viewStarsArray[${starsNumber-1}]">
        ${ getStarsElements(starsNumber) }
      </div>
    `
  }

  return `
    <div>
      <a class="pull-right" ng-click="$ctrl.toggleComponentBody()" style="cursor:pointer" >
          <span class="glyphicon"   
                ng-class="{'glyphicon-triangle-bottom':!$ctrl.componentBodyOpen, 'glyphicon-triangle-top':$ctrl.componentBodyOpen}">
          <span/>
      </a>
      <h4 class="filter-component-title">
        <ng-include src="$ctrl.starIconRoute"></ng-include> Estrellas
      </h4>
      <form ng-show="$ctrl.componentBodyOpen">
        <div class="star-filter-viewall">
          <input type="checkbox" ng-checked="$ctrl.viewAll" ng-change="$ctrl.changeViewAllAction()" ng-model="$ctrl.viewAll" ng-disabled="$ctrl.viewAll">
          <span>Todas las estrellas</span>
        </div>
        ${ getStarFilterBlock(5) }
        ${ getStarFilterBlock(4) }
        ${ getStarFilterBlock(3) }
        ${ getStarFilterBlock(2) }
        ${ getStarFilterBlock(1) }
      </form>
    </div>
  `;
}


})();
