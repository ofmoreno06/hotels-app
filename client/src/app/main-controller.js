(function(){
'use strict';

angular.module('almundoApp')
.controller('mainController', MainController);

MainController.$inject = ['$http'];
function MainController($http){
  const ctrl = this;

  // ================================================
  // setup controller
  ctrl.$onInit = function(){
    ctrl.hotelList; 
    ctrl.hotelsToShow = [];
    
    $http.get('api/hotels').then(
      function(res){
        ctrl.hotelList = res.data;
        initList();
        ctrl.showMore();
      },
      function(err){
        console.log('error fetching hotels', err);
        //TODO: mostrar nodata screen or error screen
        return [];
      }  
    );
  };

  // ================================================
  // searchById
  ctrl.searchByName = function(searchString){
    initList();
    $http.get(`api/hotels?name=${searchString}`)
    .then(function searchByNameCallback(res){
      ctrl.hotelList = res.data;
      ctrl.showMore();
    }, function(err){ console.log('error fetching hotels by name')}); 
  }

  // ================================================
  // searchByStars
  ctrl.searchByStars = function(starsArray){
    initList();
    let starsString = '';
    starsArray.forEach(function(item, index){
      if (item) starsString += String(index + 1);
    });
    $http.get(`api/hotels?stars=${starsString}`)
    .then(function searchByNameCallback(res){
      ctrl.hotelList = res.data;
      ctrl.showMore();
    }, function(err){ console.log('error fetching hotels by name')});
  }
    
  // ================================================
  // rudimentary ShowMore system
  ctrl.showMore = function(){
    let l = ctrl.hotelsToShow.length;
    for (let i = l; i < l + 10; i++){
      if (typeof ctrl.hotelList[i] !== 'undefined'){
        ctrl.hotelsToShow.push(ctrl.hotelList[i]);
      }
      else{
        ctrl.endOfList = true;
      }
    }
  } 

  function initList(){
    ctrl.hotelsToShow = [];
    ctrl.endOfList = false;
  }

}

})();
