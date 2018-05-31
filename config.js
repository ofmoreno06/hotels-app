(function(){
'use strict';

// ===================================================
// CONFIG FILE: PruebaAlmundo
// ===================================================

// ===================================================
// imports and declarations

const path = require('path');

process.env.CONFIG_FILE_URL = __dirname + '/config.js';

if (!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development';
}

// ===================================================
// export

console.log(`loading ${process.env.NODE_ENV} config`);

if(process.env.NODE_ENV === 'development'){
  module.exports = require(__dirname + '/config-dev.js');
}
else if(process.env.NODE_ENV === 'test'){
  module.exports = require(__dirname + '/config-test.js');
}
else if(process.env.NODE_ENV === 'production'){
  module.exports = require(__dirname + '/config-prod.js');
}
else{
  console.log(`NODE_ENV=${process.env.NODE_ENV} is not a valid environment.`);
  process.exit(-1);
}

})();
