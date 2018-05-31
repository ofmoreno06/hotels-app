(function(){
'use strict';

// ========================================================
// imports and declarations

console.log(__dirname + '/../../config.js');
const config = require(__dirname + '/../../config.js');
const model = require(config.MODELURL);


// ========================================================
// hotels routes

function hotelsRoutes(app){

	// ===================================
	// get hotels

	app.get('/api/hotels', function(req, res){
	  model.getHotels(req.query, function handleGetHotels(mErr, mRes){
	    if(mErr){
	      res.status(500).send({msg: 'ServerError', errorCode: '002'});
	    }
	    else {
	      res.status(200).send(mRes);
	    }
	  });
	});

	// ==================================
	// get hotels by id

	app.get('/api/hotels/:id', function(req, res){
	  model.getHotelById(req.params.id, function handleGetHotelById(mErr, mRes){
	    if(mErr){
	      res.status(500).send({msg: 'ServerError', errorCode: '002'});
	    }
	    else {
	      res.status(200).send(mRes);
	    }
	  });
	});

}

// ========================================================
// export

module.exports = hotelsRoutes;

})();

