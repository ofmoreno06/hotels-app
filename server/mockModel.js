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

exports.getHotels = function(params, callback){

  fakeDBRequest(function handleFakeDBRequest(){
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

exports.getHotelById = function(id, callback){

  fakeDBRequest(function handleFakeDBRequest(){
    const dataToReturn = data.find(function(hotel){
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

function fakeDBRequest(doThis){
  setTimeout(doThis, 500);
};

})();
