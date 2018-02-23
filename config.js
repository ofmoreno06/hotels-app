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
  STATIC_FILES_DIR: __dirname + '/client/src'
};
devConfig.TEST_API_URL = `http://localhost:${devConfig.PORT}/api`

// ===================================================
// Export configuration according to NODE_ENV
if (process.env.NODE_ENV === 'development'){
  module.exports = devConfig;
}
else{
  console.log('Not valid environment defined. Is NODE_ENV set?');
  process.exit();
}

})();
