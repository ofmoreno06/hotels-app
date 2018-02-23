(function(){
'use strict'

const componentConfig = {
  // templateUrl: 'app/components/product-overview/product-overview.template.html',
  template: getTemplate3(),
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

function getTemplate3(){
  return `
    <div class="panel">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4">
            <img class="img-responsive" 
                 ng-src="{{ $ctrl.imagesDirectory + $ctrl.hotel.image || $ctrl.imagesDirectory + 'nodisponible.png' }}" 
                 alt="hotel picture" />
          </div>
          <div class="col-md-4">
            <h3 class="product-title">{{ $ctrl.hotel.name }}</h3> 
            <!-- stars icons -->
            <div class="icon-container">
              <div class="stars-icons" ng-repeat="s in [1,2,3,4,5] | limitTo:$ctrl.hotel.stars">
                <ng-include src="$ctrl.iconsDirectory + 'filters/star.svg'"></ng-include>  
              </div>
            </div>
            <!-- amenities -->
            <div class="icon-container">
              <div ng-repeat="amenity in $ctrl.hotel.amenities" class="amenities-icons">
                <ng-include src="$ctrl.iconsDirectory + 'amenities/' + amenity + '.svg'"></ng-include>
              </div>
            </div>
          </div>
          <div class="col-md-4 price-section">
            <br>
            <p class="price-message text-center">Precio por noche por habitación</p> 
            <p class="text-center">
              <span class="currency">ARS </span>
              <span class="price"> {{ $ctrl.hotel.price }}</span>
            </p>
            <a class="btn btn-primary center-block see-product-button">Ver Hotel</a>
            <br>
          </div>
        </div>
      </div>
    </div>
  `;
}

})();
