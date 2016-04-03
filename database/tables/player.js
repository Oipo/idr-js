const table = {};
const restrictedNumberExtensions = require('../convenience/restrictedNumberExtensions');

table.name = 'player';

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(table) {
        table.increments();
        table.string('name');
        restrictedNumberExtensions.restrictedNumberColumns(table, 'hit_points');
        restrictedNumberExtensions.restrictedNumberColumns(table, 'strength');
        table.string('email', 128);
        table.string('password');
        table.timestamps();
    });
};

table.extendBookshelf = function(bookshelf) {
    const ComponentModel = require('../convenience/componentModel');

    return bookshelf.Model.extend({
        tableName: table.name,
        virtuals: {
            strength: ComponentModel('strength', restrictedNumberExtensions.playerStat),
            hit_points: ComponentModel('hit_points', restrictedNumberExtensions.playerStat)
        }
    });
};

module.exports = table;
