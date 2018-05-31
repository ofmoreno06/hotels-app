(function(){
  'use strict';

  // declarations

  const app = require('./server.js').app;
  const config = require(process.env.CONFIG_FILE_URL).server;


  // start server

  let server;

  before(done => {
    server = app.listen(config.PORT, () =>{

      console.log(
        `Server started!
        - environment: ${process.env.NODE_ENV}
        - port: ${ config.PORT }
        \n`
      );

      done();
    });
  });


  // do tests

  describe('server tests', () => {

    // import different tests

    importTest('** hotels endpoint**', './tests/hotels.test.js');

    // close server

    after(done => {
      server.close( () => {
        console.log('\nclosing express server.');
        done();
      });
    })

  });


  function importTest(name, path){
    describe(name, () => { require(path); });
  };

})();
