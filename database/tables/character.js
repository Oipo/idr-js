const table = {};

const bookshelf = require('../database');
require('./user');

table.name = 'character';
table.order = 2;

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(t) {
        t.bigIncrements('id').primary().unsigned();
        t.string('name').notNullable();
        t.string('gender').notNullable();
        t.string('personalities');
        t.string('class');
        t.bigInteger('user_id').unsigned().references('id').inTable('user').notNullable();
        t.timestamps();
        console.log(table.name);
    });
};

table.Character = bookshelf.Model.extend({
    tableName: table.name,
    user() {
        return this.hasOne('User');
    }
});

module.exports = [table, bookshelf.model('Character', table.Character)];
