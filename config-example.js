(function(){
  'use strict';

  // this is an example of config file.
  // For creating a new config file, copy this file to config-dev.js,
  // config-test.js or config-prod according to the case and modify
  // as necesary.

  const SERVER_PORT = 8000;


  // No need to modify anything below this line.
  const server = {
    PORT: SERVER_PORT,
    MODELURL: __dirname + '/server/mockModel.js',
    STATIC_FILES_DIR: __dirname + '/client/dist',
    TEST_API_URL: `http://localhost:${SERVER_PORT}/api`
  };

  exports.server = server;

})();
