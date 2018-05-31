(function(){
  'use strict';

  // declarations

  const config = require(process.env.CONFIG_FILE_URL).server;
  const assert = require('chai').assert;
  const rq = require('request');

  const ENDPOINT = config.TEST_API_URL + '/hotels';

  describe('** GET hotels **', function(){
    it('should pass', () => {
      assert.equal(true, false, 'true === true');
    });
  });

})();
