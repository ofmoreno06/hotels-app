(function(){
'use strict'

const componentConfig = {
  templateUrl: 'app/components/product-overview/product-overview.template.html',
  controller: ProductOverviewComponentController,
  bindings: {
    hotel: '<',
    imagesDirectory: '<',
    iconsDirectory: '<',
    seeHotel: '&'
  }
};

angular.module('almundoApp')
.component('productOverviewComponent', componentConfig);

function ProductOverviewComponentController(){
  const $ctrl = this;

  $ctrl.$onInit = function(){
  };

  // ================================================
  // get number of stars (for iterate stars)
  $ctrl.getStarsNumber = function(stars){
    return new Array(3);
  }
}

})();
