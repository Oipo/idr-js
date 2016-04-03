const table = {};

table.name = 'character';

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(table) {
        table.increments();
        table.string('name', 128);
        table.string('Gender', 128);
        table.string('personalities');
        table.string('class');
        table.timestamps();
    });
};

table.extendBookshelf = function(bookshelf) {
    return bookshelf.Model.extend({
        tableName: table.name,
        hasTimestamps: true
    });
};

module.exports = table;
