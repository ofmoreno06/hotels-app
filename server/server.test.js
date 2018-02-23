(function(){
'use strict';

// ========================================================
// Test for Server API 'Prueba Almundo'.
// usage: node app.test.js.
// ========================================================

// ========================================================
// imports and declarations
process.env.NODE_ENV = 'development';
const config = require('../config.js');
const request = require('request');
const APIURL = config.TEST_API_URL;


// ========================================================
// TEST: post hotels
// ========================================================
function testPostHotel(){
  console.log('TEST: postHotel');
  
  const hotelToPost = {
    name: 'myTestHotel',
    stars: 5,
    price: 45.34,
    image: 'thisImageDoesNotExist.jpeg',
    amenities: ['am1', 'am2']
  };

  const postHotelCallback = function(err, httpResponse, body){
    let msg;

    // not error in response
    msg = 'postHotelError: Hotel could not be add';
    makeTest(!err, msg, err);

    // http stautus 201
    msg = 'postHotelError: Hhttp status is not 201';
    makeTest(httpResponse.statusCode === 201, msg, httpResponse.status);

    // hotelToPost and hotelPostedMatch
    const postedHotel = JSON.parse(body);
    msg = 'postHotelError: hotelToPost and postedHotel dont match';
    makeTest(hotelsMatch(hotelToPost, postedHotel), msg, body);

    // all test passed
    console.log('testPostHotel OK!');
  }

  request.post(getRequestConfig('/hotels', hotelToPost), postHotelCallback);    
  
}

// ========================================================
// TEST: get hotels
// ========================================================
function testGetHotels(){
  console.log('TEST: getHotels');
  
  const getHotelsCallback = function(err, httpResponse, body){
    let msg;

    // not error in response
    msg = 'getHotelsError: Hotel list could not read';
    makeTest(!err, msg, err);
     
    // http stautus 200
    msg = 'getHotelsError: http status is not 200';
    makeTest(httpResponse.statusCode === 200, msg, httpResponse.status);

    // response data is array
    const responseData = JSON.parse(body);
    msg = 'getHotelsError: Response body is not an array';
    makeTest(Array.isArray(responseData), msg, httpResponse.status);
   
    // one element of response has hotel properties
    msg = 'getHotelsError: response[3] is not a valid hotel';
    const hasHotelProperties = (
      responseData[3].hasOwnProperty('name') &&    
      responseData[3].hasOwnProperty('stars') &&    
      responseData[3].hasOwnProperty('price') &&    
      responseData[3].hasOwnProperty('image') &&    
      responseData[3].hasOwnProperty('amenities')
    );
    makeTest(hasHotelProperties, msg, responseData);

    // all tests passed
    console.log('testGetHotels OK!');
  }

  request.get(`${APIURL}/hotels`, getHotelsCallback);
} 

function testGetHotelsFiteredByStars(){
  console.log('TEST: testGetHotelsFiteredByStars');
  
  const getHotelsFilteredCallback = function(err, httpResponse, body){
    let msg;

    // not error in response
    msg = 'testGetHotelsFiteredByStars: Hotel list could not read';
    makeTest(!err, msg, err);
     
    // http stautus 200
    msg = 'testGetHotelsFiteredByStars: http status is not 200';
    makeTest(httpResponse.statusCode === 200, msg, httpResponse.status);

    // response data is array
    const responseData = JSON.parse(body);
    msg = 'testGetHotelsFiteredByStars: Response body is not an array';
    makeTest(Array.isArray(responseData), msg, httpResponse.status);
    
   // all hotels have 4 or 3 stars
   msg = 'testGetHotelsFiteredByStars: Hotel hasn\'t 3 or 4 stars'; 
   responseData.forEach(function(hotel){
     makeTest(hotel.stars === 4 || hotel.stars ===3, msg, hotel); 
   }); 

    // all tests passed
    console.log('testGetHotels OK!');
  }

  request.get(`${APIURL}/hotels?stars=43`, getHotelsFilteredCallback);
}

function testGetHotelsFiteredByName(){
  console.log('TEST: testGetHotelsFiteredByName');
  
  const getHotelsFilteredCallback = function(err, httpResponse, body){
    let msg;

    // not error in response
    msg = 'testGetHotelsFiteredByName: Hotel list could not read';
    makeTest(!err, msg, err);
     
    // http stautus 200
    msg = 'testGetHotelsFiteredByName: http status is not 200';
    makeTest(httpResponse.statusCode === 200, msg, httpResponse.status);

    // response data is array
    const responseData = JSON.parse(body);
    msg = 'testGetHotelsFiteredByName: Response body is not an array';
    makeTest(Array.isArray(responseData), msg, httpResponse.status);
    
   // all hotels have name contains search words
   msg = 'testGetHotelsFiteredByName: Hotel name dont contain search words'; 
   responseData.forEach(function(hotel){
     makeTest(hotel.name.toLowerCase().indexOf('cruz') !== -1 || 
      hotel.name.toLowerCase().indexOf('miraflores') !== -1, msg, hotel); 
   }); 

    // all tests passed
    console.log('testGetHotels OK!');
  }

  request.get(`${APIURL}/hotels?name=cruz miraflores`, getHotelsFilteredCallback);
}

// ========================================================
// TEST: get hotel by id
// ========================================================
function testGetHotelById(){
  console.log('TEST: getHotelById');
  
  const getHotelByIdCallback = function(err, httpResponse, body){
    let msg;

    // not error in response
    msg = 'getHotelByIdError: Hotel could not be read';
    makeTest(!err, msg, err);
     
    // http stautus 200
    msg = 'getHotelByIdError: http status is not 200';
    makeTest(httpResponse.statusCode === 200, msg, httpResponse.status);

    // response data is array
    const responseData = JSON.parse(body);
    msg = 'getHotelByIdError: Response body is not an array';
    makeTest(Array.isArray(responseData), msg, httpResponse.status);
   
    // response object hotel properties
    msg = 'getHotelByIdError: response object is not the correct hotel';
    const isCorrectObject = (
      responseData[0].id === '161914' &&    
      responseData[0].name === 'NM Lima Hotel' &&    
      responseData[0].stars === 4 &&    
      responseData[0].price === 1445.5 &&    
      responseData[0].image === '981018_26_b.jpg' &&    
      responseData[0].amenities.toString() === 'business-center,nightclub,deep-soaking-bathtub,fitness-center,garden'
    );
    makeTest(isCorrectObject, msg, responseData);

    // all tests passed
    console.log('testGetHotelById OK!');
  }

  request.get(`${APIURL}/hotels/161914`, getHotelByIdCallback);
}

// ========================================================
// Auxiliar functions for tests
// ========================================================

// ====================================
// make test
// For each test, 'makeTest' function is been used.
// parameters:
// - booleanExpression: must be true for pass the test.
// - msgWhenFailed: message to display if test failed.
// - errMsg: Error mesage object (optional)
// ====================================
function makeTest(booleanExpression, msgWhenFailed, errorMsg) {
  if (!booleanExpression) {
    console.error('Test Error: ', msgWhenFailed);
    if(errorMsg){
    	console.error('Error Message: ', errorMsg);
    }
    process.exit();
  }
}

// ====================================
// Request config object
// ====================================
function getRequestConfig(endpoint, body){
  return {
    url: `${APIURL}${endpoint}`,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body)
  }
}

// ====================================
// compare 2 <hotel> props exept id
// returns true if are the same.
// ====================================
function hotelsMatch(hotelA, hotelB){
  if (hotelA && hotelB){
    return (
      hotelA.name === hotelB.name &&
      hotelA.stars === hotelB.stars &&
      hotelA.price === hotelB.price &&
      hotelA.image === hotelB.image &&
      hotelA.amenities.toString() === hotelB.amenities.toString()
    );    
  }
  else {
    return false;
  }
}

// ========================================================
// Main Routine
// ========================================================

function main(){
  // testPostHotel();
  testGetHotelsFiteredByStars();
  testGetHotelsFiteredByName();
  testGetHotels();
  testGetHotelById();
}
main();

})();
