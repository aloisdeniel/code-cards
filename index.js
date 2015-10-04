var program = require('commander');
var server = require('./server.js');

/**
 * Client arguments.
 */

program
  .version('0.0.1')
  .option('-p, --port [type]', 'The server [port]', 5555)
  .parse(process.argv);

// Starting server

server.start(program.port);
