(function(){
'use strict'

// =====================================================
// config
const componentConfig = {
  template: getTemplate2(),
  controller: SearchByNameComponentController,
  bindings: {
    search: '&',
    iconsDirectory: '<'
  }
};

// =====================================================
// declare
angular.module('almundoApp')
.component('searchByNameComponent', componentConfig);

// =====================================================
// logic
function SearchByNameComponentController(){
  const $ctrl = this;

  $ctrl.$onInit = function(){
    $ctrl.searchIconRoute = $ctrl.iconsDirectory + 'filters/search.svg';
    $ctrl.componentBodyOpen = true;
  }
  
  $ctrl.searchByName = function(){
    if (typeof $ctrl.stringSearch === 'undefined'){
      return;
    }
    $ctrl.search({searchString: $ctrl.stringSearch});
  }

  $ctrl.toggleComponentBody = function(){
    $ctrl.componentBodyOpen = !$ctrl.componentBodyOpen;
  };


}

// =====================================================
// template
function getTemplate2(){

  return `
    <div>
      <div>
        <a class="pull-right" ng-click="$ctrl.toggleComponentBody()" style="cursor:pointer" >
          <span class="glyphicon"   
                ng-class="{'glyphicon-triangle-bottom':!$ctrl.componentBodyOpen, 'glyphicon-triangle-top':$ctrl.componentBodyOpen}">
          <span/>
        </a>
        <h4 class="filter-component-title">
          <ng-include src="$ctrl.searchIconRoute"></ng-include> Nombre del hotel
        </h4>
        <form ng-submit="$ctrl.searchByName()" ng-show="$ctrl.componentBodyOpen">
          <div class="row">
            <div class="col-md-8">
              <input  type="text" class="form-control" 
                      placeholder="Ingrese el nombre del hotel" 
                      ng-model="$ctrl.stringSearch">
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

})();
