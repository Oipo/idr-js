const idrconfig = require('../config');
const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: idrconfig.db_host,
        port: idrconfig.db_port,
        user: idrconfig.db_user,
        password: idrconfig.db_password,
        database: idrconfig.db_database,
        charset: idrconfig.db_charset,
        ssl: idrconfig.db_ssl
    }
});

const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals');
bookshelf.plugin('registry');

module.exports = bookshelf;
