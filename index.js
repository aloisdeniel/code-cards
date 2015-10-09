#!/usr/bin/env node
var program = require('commander');

/**
 * Client arguments.
 */

program
  .command('start')
  .description('Starts the local server.')
  .option('-p, --port [port]', 'The server [port]', 5555)
  .action(function(options){
    var server = require('./server.js');
    server.start(options.port);
  });

program
  .command('import')
  .description('Import a local backup into database.')
  .option('-i, --import [file]', 'The backup [file]')
  .action(function(options){
    throw new Error('Not implemented');
  });

program
  .command('export')
  .description('Export database to a local file.')
  .option('-e, --export [file]', 'The backup [file]')
  .action(function(options){
    throw new Error('Not implemented');
  });

if (process.argv.length == 2) program.help();

program
  .version('0.0.1')
  .parse(process.argv);
