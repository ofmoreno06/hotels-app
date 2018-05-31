(function(){
'use strict';

// ========================================================
// server main file
// ========================================================
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

// ========================================================
// imports and declarations
const path = require('path');
const config = require(__dirname + '/../config.js').server;
const ROUTES_DIR = __dirname + '/routes';
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// ========================================================
// configuring middleware
app.use(bodyParser.json());
app.use(express.static(config.STATIC_FILES_DIR));

// ========================================================
// super bad error handling
app.use(function(err, req, res, next){
  if(err){
    res.status(500).send({msg: 'error in server', code: 'e001' });
    next();
  }
});

// ========================================================
// ROUTING

// API ROOT
app.get('/api', function(req, res){
  res.status(200).send({msg: 'Welcome to Almundo API' });
});

require(ROUTES_DIR + '/hotels.route.js')(app);

// EXPORT APP
exports.app = app;


})();
