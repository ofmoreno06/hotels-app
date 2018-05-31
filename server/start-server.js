(function(){
  'use strict';
  const app = require('./server.js').app;
  const config = require(process.env.CONFIG_FILE_URL).server;

  // ========================================================
  // RUN SERVER
  app.listen(config.PORT, function appListenCallback(){
      console.log(
        `Server started!
        Environment: ${process.env.NODE_ENV}
        Port: ${config.PORT}`
      );
  });

})();
