(function(){
'use strict'

// =====================================================
// config
const componentConfig = {
  template: getTemplate(),
  controller: SearchByNameComponentController,
  bindings: {
    search: '&'
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

  $ctrl.searchByName = function(){
    if (typeof $ctrl.stringSearch === 'undefined'){
      return;
    }
    $ctrl.search({searchString: $ctrl.stringSearch});
  }
}

// =====================================================
// template
function getTemplate(){
    return `
      <div>
        <div>
          <h4>Nombre del hotel</h4>
           <form ng-submit="$ctrl.searchByName()">
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
