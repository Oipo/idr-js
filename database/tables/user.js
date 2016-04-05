const table = {};

const bookshelf = require('../database');
require('./character');

table.name = 'user';
table.order = 1;

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(t) {
        t.bigIncrements('id').primary().unsigned();
        t.string('name').notNullable();
        t.string('password', 128).notNullable();
        t.timestamps();
        console.log(table.name);
    });
};

table.User = bookshelf.Model.extend({
    tableName: table.name,
    characters() {
        return this.hasMany('Character');
    }
});

module.exports = [table, bookshelf.model('User', table.User)];
