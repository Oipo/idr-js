'use strict';
const prompt = require('prompt');
const fs = require('fs');

prompt.start();

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function writeToConfig(result) {
    const ssl = result.ssl.toLowerCase() == 'yes';
    let content = 'var config = {};\n';
    content += '\n';
    content += 'config.db_host = \'' + result.host + '\';\n';
    content += 'config.db_port = \'' + result.port + '\';\n';
    content += 'config.db_user = \'' + result.username + '\';\n';
    content += 'config.db_password = \'' + result.passwordMasked + '\';\n';
    content += 'config.db_database = \'' + result.database + '\';\n';
    content += 'config.db_charset = \'' + result.charset + '\';\n';
    content += 'config.db_ssl = \'' + ssl + '\';\n';
    content += '\n';
    content += 'module.exports = config\n';
    // write to config here

    fs.writeFile('config.js', content, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('config.js created.');
    });
}

function askUserInput() {
    prompt.get([{
        name: 'host',
        required: true
    }, {
        name: 'port',
        required: true,
        message: 'Port must be a number between 0 and 65535',
        conform(value) {
            return isNumber(value) && value >= 0 && value <= 65535;
        }
    }, {
        name: 'database',
        required: true
    }, {
        name: 'charset',
        required: true,
        default: 'utf8'
    }, {
        name: 'username',
        required: true
    }, {
        name: 'passwordMasked',
        hidden: true,
        replace: '*'
    }, {
        name: 'ssl',
        message: 'Use ssl for connection?',
        pattern: /y[es]|n[o]?/,
        warning: 'Must respond yes or no',
        default: 'yes'
    }], function(err, result) {
        console.log('  host: ' + result.host + ':' + result.port);
        console.log('  database: ' + result.database);
        console.log('  charset: ' + result.charset);
        console.log('  username: ' + result.username);
        console.log('  passwordMasked: ');
        console.log('  use ssl: ' + result.ssl);

        prompt.get([{
            name: 'yesno',
            message: 'Is this input correct?',
            validator: /y[es]*|n[o]?/,
            warning: 'Must respond yes or no',
            default: 'no'
        }], function(err, resultConfirm) {
            if(resultConfirm.yesno.toLowerCase().indexOf('no') >= 0) {
                askUserInput();
                return;
            }

            fs.stat('config.js', function(err, stats) {
                if(err) { // file exists
                    writeToConfig(result);
                } else {
                    prompt.get([{
                        name: 'yesno',
                        message: 'config.js already exists, overwrite?',
                        validator: /y[es]*|n[o]?/,
                        warning: 'Must respond yes or no',
                        default: 'no'
                    }], function(err, resultOverwrite) {
                        if(resultOverwrite.yesno.toLowerCase().indexOf('yes') >= 0) {
                            return writeToConfig(result);
                        }

                        console.log('Aborted.');
                    });
                }
            });
        });
    });
}

askUserInput();
