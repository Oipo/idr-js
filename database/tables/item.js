const table = {};

require('./statsobject');
const bookshelf = require('../database');

table.name = 'item';
table.order = 3;

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(t) {
        t.bigIncrements('id').primary().unsigned();
        t.string('name').notNullable();
        t.string('slot').notNullable();
        t.bigInteger('statsobject_id').unsigned().references('id').inTable('statsobject');
        console.log(table.name);
    });
};

table.Item = bookshelf.Model.extend({
    tableName: table.name,
    statsobject() {
        return this.hasOne('statsobject');
    }
});

module.exports = [table, bookshelf.model('Item', table.Item)];
