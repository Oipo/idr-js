const table = {};

const restrictedNumberExtensions = require('../convenience/restrictedNumberExtensions');
const bookshelf = require('../database');
const ComponentModel = require('../convenience/componentModel');

table.name = 'statsobject';
table.order = 0;

table.createTable = function(knex) {
    return knex.schema.createTable(table.name, function(t) {
        t.bigIncrements('id').primary().unsigned();
        restrictedNumberExtensions.restrictedNumberColumns(t, 'hit_points');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'magic_points');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'strength');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'dexterity');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'intelligence');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'constitution');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'wisdom');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'agility');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'luck');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'level');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'experience_points');
        restrictedNumberExtensions.restrictedNumberColumns(t, 'gold');
        console.log(table.name);
    });
};

table.Statsobject = bookshelf.Model.extend({
    tableName: table.name,
    virtuals: {
        hit_points: ComponentModel('hit_points', restrictedNumberExtensions.playerStat),
        magic_points: ComponentModel('magic_points', restrictedNumberExtensions.playerStat),
        strength: ComponentModel('strength', restrictedNumberExtensions.playerStat),
        dexterity: ComponentModel('dexterity', restrictedNumberExtensions.playerStat),
        intelligence: ComponentModel('intelligence', restrictedNumberExtensions.playerStat),
        constitution: ComponentModel('constitution', restrictedNumberExtensions.playerStat),
        wisdom: ComponentModel('wisdom', restrictedNumberExtensions.playerStat),
        agility: ComponentModel('agility', restrictedNumberExtensions.playerStat),
        luck: ComponentModel('luck', restrictedNumberExtensions.playerStat),
        level: ComponentModel('level', restrictedNumberExtensions.playerStat),
        experience_points: ComponentModel('experience_points', restrictedNumberExtensions.playerStat),
        gold: ComponentModel('gold', restrictedNumberExtensions.playerStat)
    }
});

module.exports = [table, bookshelf.model('Statsobject', table.Statsobject)];
