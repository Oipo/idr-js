// Application entry point, add application code here

const idrconfig = require('./config');
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
'use strict';
const PlayerTable = require('./database/tables/player');
const Player = PlayerTable.extendBookshelf(bookshelf);

knex.schema.dropTableIfExists(PlayerTable.name).then(function() {
    return PlayerTable.createTable(knex);
}).then(function() {
    const player = new Player({
        hit_points: { minimum: 0, maximum: 100, current: 100 },
        strength: { minimum: 10, maximum: 200, current: 50 }
    });
    player.set('name', 'John Doe');

    return player.save();
}).then(function(p) {
    console.log('User saved:', p.get('name'));

    Player.where('id', 1).fetch().then(function(user) {
        console.log(user.toJSON());
    }).catch(function(err) {
        console.error(err);
    }).finally(function() {
        knex.destroy();
    });
});
