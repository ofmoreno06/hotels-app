(function(){
'use strict';

// ===================================================
// CONFIG FILE: PruebaAlmundo
// ===================================================
	
// ===================================================
// imports and declarations
const path = require('path');

// ===================================================
// DEV ENV CONFIG
const devConfig = {
  PORT: 8000,
  MODELURL: __dirname + '/server/mockModel.js',
  STATIC_FILES_DIR: __dirname + '/client/dist'
};
devConfig.TEST_API_URL = `http://localhost:${devConfig.PORT}/api`

// ===================================================
// PRODUCTION CONFIG
const prodConfig = {
  STATIC_FILES_DIR: __dirname + '/client'
};

// ===================================================
// Export configuration according to NODE_ENV
if (process.env.NODE_ENV === 'development'){
  module.exports = devConfig;
}
else if (process.env.NODE_ENV === 'production'){
  module.exports = prodConfig;
}
else{
  console.log('Not valid environment defined. Is NODE_ENV set?');
  process.exit();
}

})();
