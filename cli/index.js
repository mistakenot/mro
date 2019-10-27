var argv = require('yargs')
    .usage('mro <command> [options]')
    .command('count', 'Count the lines in a file')
    .example('orm -d foo.js', 'count the lines in the given file')
    .alias('d', 'database')
    .nargs('d', 1)
    .describe('d', 'Database to use.')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

module.exports = argv