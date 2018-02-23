(function(){
'use strict';

// ===================================================
// MOCK MODEL LAYER
// ===================================================

// ===================================================
// imports and declarations
const data = require('./data/data.json');
const simulateError = false;

// ===================================================
// get hotels
exports.getHotels = function getHotelsCallback(params, callback){
  fakeCallToDB(function fakeCallToDbCallback(){
    if (Object.getOwnPropertyNames(params).length === 0){
      callback(null, data); 
    }
    else{
      let dataToReturn = data;
      if (params.stars){
        dataToReturn = filterByStars(data, params.stars);
      }
      if (params.name){
        dataToReturn = filterByName(dataToReturn, params.name.toLowerCase());
      }
      callback(null, dataToReturn); 
    }
  });
};

// ===================================================
// get hotel by id
exports.getHotelById = function getHotelByIdCallback(id, callback){
  fakeCallToDB(function fakeCallToDbCallback(){
    const dataToReturn = data.filter(function(hotel){
      return hotel.id === id; 
    });
    callback(null, dataToReturn); 
  });
};

// ===================================================
// TODO: fake post request

// ===================================================
// TODO: fake update request

// ===================================================
// TODO: fake delete request



// ===================================================
// FILTERS

// =============================
// by stars
function filterByStars(array, starsString){
  const stars = starsString.split('');

  const starsMatch = function (value){
    let valToReturn = false;
    for (let i = 0; i < stars.length; i++) {
      if (value === Number(stars[i])){
        valToReturn = true;
        break;
      }
    }
    return valToReturn;
  }

  return array.filter(function(item){
    return starsMatch(item.stars);
  });
}

// =============================
// by name
function filterByName(array, searchString){
  const terms = searchString.split(' ');

  const termMatch = function(value){
    let valToReturn = false;
    for (let i = 0; i < terms.length; i++) {
      if (value.toLowerCase().indexOf(terms[i]) !== -1){
        valToReturn = true;
        break;
      }
    }
    return valToReturn;
  };

  return array.filter(function(item){
    return termMatch(item.name);
  });
}

// fake call to db
function fakeCallToDB(doThis){
  setTimeout(doThis, 500);
};
})();